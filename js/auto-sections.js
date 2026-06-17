/* ============================================================================
 * auto-sections.js — QS Lab homepage AUTO area (INTERCONNECT.md §4, invariant I3)
 *
 * 자동영역 ↔ 수동영역 물리 분리:
 *   - 이 스크립트는 data/*.json (봇/Slack 이 쓰는 자동영역) 만 읽어
 *     index.html 안의 <... data-auto="..."> 로 명시된 구역에만 주입한다.
 *   - 수동영역(소개·PI·연구 본문·채용 카드·기관 공동연구자 등)은 안 건드린다.
 *
 * News & Highlights:  data/news.json   → #news-list-wrap[data-auto="news"]
 *   파생: window.syncHomeNews()(홈 그리드) · window.refreshNewsMeta()(정렬·배지).
 * People (members):   data/members.json → .mgrid[data-auto="members"] (ra/grad/intern/postdoc/alumni)
 *   파생: window.refreshPeopleCounts()(인원수 칩) · window.highlightLabAuthors()(저자 강조).
 *   채용("We Are Hiring") 카드는 보존하고 멤버 카드만 교체한다.
 *
 * 안전장치: fetch 실패/빈 데이터면 아무것도 안 한다 → index.html 정적 폴백 유지.
 * 멱등: content.json 적용 후 rerunHooks 에서 다시 호출돼도 같은 결과.
 * 가드: 자동 렌더 성공 구역엔 data-auto-rendered="1" 표식 → admin 발행이 폴백을
 *      직렬화해 좋은 데이터를 덮어쓰는 사고를 막는다(index.html publish 가 확인).
 * ==========================================================================*/
(function () {
  'use strict';

  function esc(s) { return (s == null ? '' : String(s)); }

  /* ── News ───────────────────────────────────────────────────────────── */
  function buildNewsItem(it) {
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

  var _newsSig = null;

  function applyNews(data) {
    var wrap = document.querySelector('#news-list-wrap[data-auto="news"]')
            || document.getElementById('news-list-wrap');
    if (!wrap) return;
    var items = (data && Array.isArray(data.items)) ? data.items
              : (Array.isArray(data) ? data : null);
    if (!items || !items.length) return;
    var sig = JSON.stringify(items);
    if (sig === _newsSig && wrap.getAttribute('data-auto-rendered') === '1') return;

    var frag = document.createDocumentFragment();
    items.forEach(function (it) { frag.appendChild(buildNewsItem(it)); });
    wrap.innerHTML = '';
    wrap.appendChild(frag);
    wrap.setAttribute('data-auto-rendered', '1');
    _newsSig = sig;

    if (window.refreshNewsMeta) window.refreshNewsMeta();
    if (window.syncHomeNews) window.syncHomeNews();
  }

  /* ── People (members) ───────────────────────────────────────────────── */
  var GRID = { ra: 'grid-ra', grad: 'grid-grad', intern: 'grid-intern',
               postdoc: 'grid-postdoc', alumni: 'grid-alumni' };

  function initialsOf(name) {
    return String(name || '').split(/\s+/).map(function (w) { return w[0] || ''; })
      .join('').slice(0, 2).toUpperCase();
  }

  function buildMember(m) {
    var alumni = m.category === 'alumni' || m.alumni;
    var card = document.createElement('div');
    card.className = 'mcard' + (m.nameonly ? ' mcard-nameonly' : '');
    card.setAttribute('data-adm-card', '');
    card.setAttribute('data-adm-type', 'member');
    if (alumni) card.setAttribute('data-alumni', '1');

    var row = document.createElement('div');
    row.className = 'mcard-btns';
    var eb = document.createElement('button');
    eb.className = 'mc-btn mc-edit'; eb.textContent = '✎ Edit';
    eb.setAttribute('data-action', 'edit');
    var db = document.createElement('button');
    db.className = 'mc-btn mc-del'; db.textContent = '✕ Delete';
    db.setAttribute('data-action', 'delete');
    row.appendChild(eb); row.appendChild(db);
    if (!m.nameonly) {
      var hb = document.createElement('button');
      hb.className = 'mc-btn mc-hire'; hb.textContent = '→ Hiring';
      hb.setAttribute('data-action', 'hiring');
      row.appendChild(hb);
    }
    card.appendChild(row);

    if (!m.nameonly) {
      var wrap = document.createElement('div');
      wrap.className = 'mcard-img-wrap';
      if (m.image) {
        var img = document.createElement('img');
        img.src = m.image; img.alt = esc(m.name); img.loading = 'lazy';
        wrap.appendChild(img);
      } else {
        var ph = document.createElement('div');
        ph.className = 'mcard-ph';
        ph.textContent = esc(m.initials || initialsOf(m.name));
        wrap.appendChild(ph);
      }
      card.appendChild(wrap);
    }

    var nm = document.createElement('div');
    nm.className = 'mcard-name'; nm.textContent = esc(m.name);
    card.appendChild(nm);
    var ro = document.createElement('div');
    ro.className = 'mcard-role'; ro.textContent = esc(m.role);
    card.appendChild(ro);
    if (!m.nameonly && m.desc) {
      var ds = document.createElement('div');
      ds.className = 'mcard-desc'; ds.textContent = esc(m.desc);
      card.appendChild(ds);
    }
    return card;
  }

  var _memSig = null;

  function applyMembers(data) {
    var members = (data && Array.isArray(data.members)) ? data.members
                : (Array.isArray(data) ? data : null);
    if (!members || !members.length) return;
    var anyGrid = false;
    Object.keys(GRID).forEach(function (c) {
      var g = document.getElementById(GRID[c]);
      if (g && g.getAttribute('data-auto') === 'members') anyGrid = true;
    });
    if (!anyGrid) return;

    var sig = JSON.stringify(members);
    var grad = document.getElementById('grid-grad');
    if (sig === _memSig && grad && grad.getAttribute('data-auto-rendered') === '1') return;

    var byCat = {};
    Object.keys(GRID).forEach(function (c) { byCat[c] = []; });
    members.forEach(function (m) {
      var c = (m.category && byCat[m.category]) ? m.category : 'grad';
      byCat[c].push(m);
    });

    Object.keys(GRID).forEach(function (c) {
      var g = document.getElementById(GRID[c]);
      if (!g || g.getAttribute('data-auto') !== 'members') return;
      g.querySelectorAll('.mcard[data-adm-type="member"]').forEach(function (el) { el.remove(); });
      var frag = document.createDocumentFragment();
      byCat[c].forEach(function (m) { frag.appendChild(buildMember(m)); });
      g.appendChild(frag);
      g.setAttribute('data-auto-rendered', '1');
    });
    _memSig = sig;

    var aLabel = document.getElementById('alumni-card-label');
    if (aLabel) aLabel.style.display = byCat.alumni.length ? '' : 'none';

    if (window.refreshPeopleCounts) window.refreshPeopleCounts();
    if (window.highlightLabAuthors) window.highlightLabAuthors();
    try {
      if (window.Admin && Admin.isActive && Admin.isActive() && Admin.injectAllButtons) {
        Admin.injectAllButtons();
      }
    } catch (e) { /* admin module optional */ }
  }

  /* ── fetch + render ─────────────────────────────────────────────────── */
  var _newsCache = null, _memCache = null;

  function renderAutoNews() {
    if (_newsCache) applyNews(_newsCache);
    fetch('data/news.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d) { _newsCache = d; applyNews(d); } })
      .catch(function () {});
  }

  function renderAutoMembers() {
    if (_memCache) applyMembers(_memCache);
    fetch('data/members.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d) { _memCache = d; applyMembers(d); } })
      .catch(function () {});
  }

  function renderAll() { renderAutoNews(); renderAutoMembers(); }

  window.renderAutoNews = renderAutoNews;
  window.renderAutoMembers = renderAutoMembers;
  window.renderAutoSections = renderAll;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }
})();
