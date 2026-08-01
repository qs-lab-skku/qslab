# Research Landscape 관리 안내

Research Landscape 페이지는 정적 파일 두 개로 동작합니다.

| 파일 | 역할 |
|---|---|
| `landscape-data.js` | 데이터 파일. 논문·과제 목록(`P`), 소재 열(`COLS`), 밴드(`ORDER`), 계보 화살표(`EDGES`), 갱신 일자(`UPDATED`)가 들어 있습니다. **평소에 고칠 파일은 이것 하나입니다.** |
| `research-landscape.html` | 화면 파일. 디자인과 렌더링 로직만 있습니다. 좌표는 데이터에서 자동 계산되므로 이 파일은 건드릴 일이 거의 없습니다. |

수정 후에는 `research-landscape.html`을 브라우저에서 열어(더블클릭이면 충분) 화면이 정상인지 확인하세요.

---

## 1. 논문 추가하는 법

`landscape-data.js`의 `P` 배열에서 비슷한 항목을 찾아 아래 템플릿을 복사해 넣고 값만 바꾸면 됩니다.
좌표 계산은 필요 없습니다. 같은 칸이 차 있으면 행이 자동으로 늘어납니다.

```js
 {id:'unique25',                 // 고유 id. 짧은 영문+연도 권장. 다른 항목과 겹치면 안 됨
  kw:'Short keyword',            // 모바일 모식도에 표시되는 짧은 키워드
  r:'B',                         // 밴드 키 (아래 표 참고)
  material:'TMD',                // 소재 열 키 (아래 표 참고)
  // materialTo:'FE',            // (선택) 여러 소재에 걸치는 리뷰 등은 끝 열을 지정
  j:'Nat. Commun. 2025',         // 카드에 표시되는 저널·과제 라벨
  t:'Short display title',       // 카드에 표시되는 짧은 제목
  st:'pub',                      // 상태: pub(게재) acc(인쇄 중) rev(심사 중) plan(진행 과제)
  // bd:'R',                     // (선택) 문헌 유형: R(Review) P(Perspective) RM(Roadmap)
  role:'First author',           // 역할. 'Coauthor'면 카드가 흐리게 표시됨
  // lab:1,                      // (선택) 연구실 주도 결과면 1 (QS 배지 표시)
  full:'Full paper title as published',
  cite:'Nat. Commun. 16, 1234 (2025)',
  url:'https://doi.org/10...',   // (선택) 논문 링크. 없으면 줄 자체를 빼면 됨
  // note:'Led by ...',          // (선택) 상세 시트에 표시되는 비고
 },
```

- 항목을 넣는 **순서**대로 위에서부터 배치됩니다. 같은 밴드의 비슷한 항목 옆에 넣으세요.
- 계보 화살표를 추가하려면 `EDGES`에 `['출발id','도착id','L']`(실선) 또는 `'X'`(점선)를 추가합니다.
- 갱신 일자는 파일 위쪽의 `UPDATED` 문자열을 바꿉니다.

## 2. 상태만 바꾸는 법

예: 심사 중이던 논문이 게재됐을 때.

1. `P`에서 해당 항목을 id나 제목으로 검색합니다.
2. `st:'rev'`를 `st:'pub'`으로 바꿉니다.
3. `j`(예: `'Under review'` → `'Nat. Commun. 2026'`)와 `cite`를 게재 정보로 바꾸고, `url`에 논문 링크를 넣습니다.

상태 값의 의미:

| 값 | 표시 |
|---|---|
| `pub` | Published |
| `acc` | In press |
| `rev` | In review (테두리 점선) |
| `plan` | Active (테두리 점 점선, 과제) |

## 3. 키 대응표

소재 열 (`material`, `materialTo`) - 왼쪽(금속성)부터 오른쪽(절연성) 순서:

| 키 | 열 |
|---|---|
| `SC` | Superconducting & topological (FeSe, MnBi₂Te₄, Te) |
| `TE` | Telluride semimetals (MoTe₂, WTe₂, PtTe₂) |
| `TMD` | TMD semiconductors (MoS₂, WS₂, WSe₂, ReS₂) |
| `IIIVI` | III-VI compounds (InSe, In₂Se₃, GaSe) |
| `FE` | Ferroelectrics (AlScN, HZO, CIPS) |
| `HBN` | Dielectrics (hBN) |

밴드 (`r`) - 위에서부터:

| 키 | 밴드 |
|---|---|
| `E` | Outlooks and roadmaps |
| `Q` | Cryogenic and quantum electronics |
| `D` | Quantum light and excitons |
| `CD` | Ferroelectric control of optical response (D와 C 사이 겹침 구간) |
| `C` | Ferroelectric logic and memory |
| `BC` | Contact engineering with ferroelectric gates (C와 B 사이 겹침 구간) |
| `B` | Contacts and transistor integration |
| `AB` | Growth-defined contacts and interconnects (B와 A 사이 겹침 구간) |
| `A` | Synthesis and epitaxy |
| `F` | Energy and functional materials (축 밖 패널, `material` 불필요) |

## 4. 색상

카드 색은 밴드 색을 자동으로 따릅니다. 다른 밴드 색을 쓰고 싶은 예외에만 `pc:'B'`처럼
지정하고, 위아래 두 색을 나눠 칠하려면 `sc`(위쪽 보조색)를 추가합니다. 웬만하면 둘 다
생략하면 됩니다.
