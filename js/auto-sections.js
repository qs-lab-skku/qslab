/* ============================================================================
 * auto-sections.js — QS Lab homepage AUTO area (INTERCONNECT.md §4, invariant I3)
 *
 * 자동영역 ↔ 수동영역 물리 분리:
 *   - 이 스크립트는 data/*.json (봇/Slack 이 쓰는 자동영역) 만 읽어
 *     index.html 안의 <... data-auto="..."> 로 명시된 구역에만 주입한다.
 *   - 수동영역(소개·PI·People·연구 본문 등)은 절대 건드리지 않는다.
 *
 * News & Highlights:
 *   소스    = data/news.json  (Slack 봇 /home-news + 홈페이지 admin 발행이 함께 씀)
 *   대상    = #news-list-wrap[data-auto="news"]  (News 페이지 목록)
 *   파생    = 기존 window.syncHomeNews() 가 이 목록에서 홈 하이라이트 그리드를,
 *            window.refreshNewsMeta() 가 정렬·"Latest update" 배지를 만든다(재사용).
 *
 * 안전장치: fetch 실패/빈 배열이면 아무것도 안 한다 → index.html 의 정적
 *   뉴스(폴백)가 그대로 보인다(사이트가 비지 않음).
 * 멱등: 여러 번 호출해도(특히 content.json 적용 후 rerunHooks) 같은 결과.
 * ==========================================================================*/
(function () {
  'use strict';

  function esc(s) { return (s == null ? '' : String(s)); }

  /* Build one .news-item node matching the in-page admin markup, so the
     admin edit/delete buttons and syncHomeNews()/refreshNewsMeta() all work
     on auto-rendered items exactly as on hand-authored ones. */
  function buildItem(it) {
    var item = document.createElement('div');
    item.className = 'news-item';
    item.setAttribute('data-adm-card', '');
    item.setAttribute('data-adm-type', 'news');

    var dateD = document.createElement('div');
    dateD.className = 'news-date';
    dateD.textContent = esc(it.date);

    var cont = document.createElement('div');
    cont.className = 'news-content';

    var h3 = document.createElement('h3');
    h3.textContent = esc(it.title);
    cont.appendChild(h3);

    var p = document.createElement('p');
    p.textContent = esc(it.body);
    if (it.url) {
      var a = document.createElement('a');
      a.href = it.url; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = ' Link →'; a.style.color = 'var(--blue)';
      p.appendChild(a);
    }
    cont.appendChild(p);

    if (it.image) {
      var img = document.createElement('img');
      img.src = it.image;
      img.alt = esc(it.title);
      img.loading = 'lazy';
      if (it.image_contain) {
        img.style.objectFit = 'contain';
        img.style.background = '#fff';
        img.style.maxHeight = '240px';
      }
      cont.appendChild(img);
    }

    /* admin edit/delete buttons (CSS hides them unless body.admin-on) */
    var btns = document.createElement('div');
    btns.className = 'news-edit-btns';
    var be = document.createElement('button');
    be.className = 'news-edit-btn edit'; be.textContent = '✎ Edit';
    be.setAttribute('data-newsaction', 'edit');
    var bd = document.createElement('button');
    bd.className = 'news-edit-btn del'; bd.textContent = '✕ Delete';
    bd.setAttribute('data-newsaction', 'delete');
    btns.appendChild(be); btns.appendChild(bd);
    cont.appendChild(btns);

    item.appendChild(dateD);
    item.appendChild(cont);
    return item;
  }

  var _lastSig = null;

  function applyNews(data) {
    var wrap = document.querySelector('#news-list-wrap[data-auto="news"]')
            || document.getElementById('news-list-wrap');
    if (!wrap) return;
    var items = (data && Array.isArray(data.items)) ? data.items
              : (Array.isArray(data) ? data : null);
    if (!items || !items.length) return;   /* keep static fallback */

    var sig = JSON.stringify(items);
    /* Skip rebuild only if the DOM already reflects this exact data AND the
       wrap currently holds auto items (content.json may have replaced it). */
    if (sig === _lastSig && wrap.getAttribute('data-auto-rendered') === '1') return;

    var frag = document.createDocumentFragment();
    items.forEach(function (it) { frag.appendChild(buildItem(it)); });
    wrap.innerHTML = '';
    wrap.appendChild(frag);
    wrap.setAttribute('data-auto-rendered', '1');
    _lastSig = sig;

    if (window.refreshNewsMeta) window.refreshNewsMeta();
    if (window.syncHomeNews) window.syncHomeNews();
  }

  var _cache = null;

  /* Render from cache (fast, used by rerunHooks after content.json applies)
     and (re)fetch in the background to pick up new pushes. */
  function renderAutoNews() {
    if (_cache) applyNews(_cache);
    fetch('data/news.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d) { _cache = d; applyNews(d); } })
      .catch(function () { /* offline → keep fallback/cache */ });
  }

  window.renderAutoNews = renderAutoNews;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAutoNews);
  } else {
    renderAutoNews();
  }
})();
