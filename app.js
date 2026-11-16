'use strict';
/* ───────── ikony (inline SVG, bez zależności) ───────── */
const ICONS = {
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  wallet:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  sliders:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  download:'<path d="M12 4v12m0 0-4-4m4 4 4-4M5 20h14"/>',
  more:'<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
  tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1"/>',
  printer:'<path d="M7 9V3h10v6M7 17H4v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6h-3"/><rect x="7" y="14" width="10" height="7"/>',
  columns:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/>',
  'filter-x':'<path d="M3 5h18l-7 8v6l-4 2v-8z"/><path d="m17 17 4 4m0-4-4 4"/>',
  'chev-down':'<path d="m6 9 6 6 6-6"/>',
  'chev-left':'<path d="m15 6-6 6 6 6"/>',
  'chev-right':'<path d="m9 6 6 6-6 6"/>',
  sort:'<path d="M12 5v14m0-14-4 4m4-4 4 4"/>',
  alert:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  inbox:'<path d="M3 13h5l1 3h6l1-3h5"/><path d="M5 5h14l2 8v6H3v-6z"/>',
  grip:'<circle cx="9" cy="6" r="1.2"/><circle cx="15" cy="6" r="1.2"/><circle cx="9" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/><circle cx="9" cy="18" r="1.2"/><circle cx="15" cy="18" r="1.2"/>',
  up:'<path d="m6 15 6-6 6 6"/>',
  down:'<path d="m6 9 6 6 6-6"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
  bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  logout:'<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>',
  calendar:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
  bank:'<path d="M3 10 12 4l9 6zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  archive:'<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10h14V9M10 13h4"/>',
  check:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  refresh:'<path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/>',
};
const icon = n => `<span class="i" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONS[n] || ''}</svg></span>`;
document.querySelectorAll('.i[data-i]').forEach(el => { el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[el.dataset.i] || ''}</svg>`; el.setAttribute('aria-hidden', 'true'); });

/* ───────── dane demonstracyjne ───────── */
const pad = n => String(n).padStart(2, '0');
const LABELS = ['Do sprawdzenia', 'Zaksięgowane', 'Wymaga korekty'];
const JPK = ['MPP', 'TP', 'B_SPV'];

function salesData() {
  return Array.from({ length: 14 }, (_, k) => {
    const i = k + 1, kor = i === 3;
    const net = kor ? -400 : (i === 5 || i === 9 ? 650 : 800);
    const rate = kor ? 'np' : '23%';
    const vat = kor ? 0 : net * 0.23;
    const labels = [];
    if (i === 1) labels.push('Zaksięgowane');
    if (i % 3 === 0) labels.push('Do sprawdzenia');
    if (kor) labels.push('Wymaga korekty');
    return {
      id: `DEMO-S-${i}`, kontrahent: `Demo Alfa ${pad(i)}`, data: `2026-10-${pad(i)}`,
      numer: kor ? `KOR/3/10/2026/DEMO` : `FV/${i}/10/2026/DEMO`,
      ksef: i >= 13 ? `DEMO-KSEF-20261013-00${i}` : null,
      netto: net, vat, brutto: net + vat, stawka: rate,
      rodzaj: kor ? 'Korekta' : 'Sprzedaż krajowa',
      jpk: i === 7 ? 'B_SPV' : i % 4 === 0 ? 'MPP' : i % 5 === 0 ? 'TP' : '—',
      seria: kor ? 'KOR' : 'FV', labels,
    };
  });
}
function purchaseData() {
  return Array.from({ length: 9 }, (_, k) => {
    const i = k + 1, net = 500 + i * 50;
    return {
      id: `DEMO-P-${i}`, kontrahent: `Demo Beta ${pad(i)}`, data: `2026-10-${pad(i + 1)}`,
      numer: `ZAK/${i}/10/2026/DEMO`, ksef: i <= 3 ? `DEMO-KSEF-20261002-10${i}` : null,
      netto: net, vat: net * 0.23, brutto: net * 1.23, stawka: '23%',
      rodzaj: 'Zakup krajowy', jpk: i % 4 === 0 ? 'MPP' : '—', seria: 'ZAK',
      labels: i % 2 ? ['Zaksięgowane'] : [],
    };
  });
}
const DATA = { sales: salesData(), purchases: purchaseData() };

const COLS = [
  { key: 'kontrahent', label: 'Kontrahent', cls: 'k' },
  { key: 'data', label: 'Data' },
  { key: 'numer', label: 'Numer dokumentu' },
  { key: 'ksef', label: 'Numer KSeF' },
  { key: 'id', label: 'Identyfikator' },
];
const MONTHS = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
const DEFAULTS = { year: '2026', month: '10', op: 'all', jpk: 'all' };

/* ───────── stan ───────── */
const S = {
  tab: 'sales', q: '', ...DEFAULTS, series: null, labels: new Set(),
  sort: { key: null, dir: 1 }, page: 1, perPage: 10,
  cols: COLS.map(c => ({ key: c.key, visible: true })),
  open: new Set(), demo: 'filled', loading: false,
};

const $ = s => document.querySelector(s);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nf = new Intl.NumberFormat('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = n => nf.format(n) + ' zł';
const colDef = k => COLS.find(c => c.key === k);

/* ───────── logika danych ───────── */
function allRows() { return DATA[S.tab]; }
function seriesOptions() { return [...new Set(allRows().map(r => r.seria))]; }
function activeSeries() { return S.series ?? new Set(seriesOptions()); }

function filteredRows() {
  if (S.demo === 'empty') return [];
  const q = S.q.trim().toLowerCase();
  const ser = activeSeries();
  let rows = allRows().filter(r =>
    r.data.slice(0, 4) === S.year &&
    (S.month === 'all' || r.data.slice(5, 7) === S.month) &&
    (S.op === 'all' || r.rodzaj === S.op) &&
    (S.jpk === 'all' || r.jpk === S.jpk) &&
    ser.has(r.seria) &&
    (!S.labels.size || r.labels.some(l => S.labels.has(l))) &&
    (!q || [r.kontrahent, r.data, r.numer, r.ksef || 'brak potwierdzenia', r.id].join(' ').toLowerCase().includes(q))
  );
  if (S.sort.key) {
    const k = S.sort.key;
    rows = [...rows].sort((a, b) => String(a[k] ?? '').localeCompare(String(b[k] ?? ''), 'pl', { numeric: true }) * S.sort.dir);
  }
  return rows;
}

function activeFilters() {
  const f = [];
  if (S.op !== 'all') f.push({ k: 'op', t: `Operacje: ${S.op}` });
  if (S.jpk !== 'all') f.push({ k: 'jpk', t: `JPK V7: ${S.jpk}` });
  if (S.series && S.series.size !== seriesOptions().length) f.push({ k: 'series', t: `Serie: ${[...S.series].join(', ') || 'brak'}` });
  if (S.labels.size) f.push({ k: 'labels', t: `Etykiety: ${[...S.labels].join(', ')}` });
  return f;
}
const periodIsDefault = () => S.year === DEFAULTS.year && S.month === DEFAULTS.month;

/* ───────── render ───────── */
function renderSelects() {
  const opts = (vals, cur, all) => (all ? [['all', 'Wszystkie']] : []).concat(vals).map(([v, t]) => `<option value="${esc(v)}"${String(v) === String(cur) ? ' selected' : ''}>${esc(t)}</option>`).join('');
  const rows = allRows();
  $('#fYear').innerHTML = opts([['2026', '2026'], ['2025', '2025']], S.year, false);
  $('#fMonth').innerHTML = opts(MONTHS.map((m, i) => [pad(i + 1), m]), S.month, true);
  $('#fOp').innerHTML = opts([...new Set(rows.map(r => r.rodzaj))].map(v => [v, v]), S.op, true);
  $('#fJpk').innerHTML = opts([...new Set(rows.map(r => r.jpk))].filter(v => v !== '—').map(v => [v, v]), S.jpk, true);
}

function renderChrome() {
  const n = activeFilters().length + (periodIsDefault() ? 0 : 1);
  const fc = $('#filtersCount'); fc.hidden = !n; fc.textContent = n;
  const sc = $('#seriesCount'), sn = S.series && S.series.size !== seriesOptions().length ? S.series.size : 0;
  sc.hidden = !sn; sc.textContent = sn;
  const period = S.month === 'all' ? S.year : `${MONTHS[+S.month - 1]} ${S.year}`;
  const chips = [`<span class="chip fixed">Okres: ${esc(period)}</span>`]
    .concat(activeFilters().map(f => `<span class="chip">${esc(f.t)}<button type="button" data-clear="${f.k}" aria-label="Usuń filtr: ${esc(f.t)}">${icon('x')}</button></span>`));
  if (n) chips.push('<button type="button" class="chip-link" id="chipsReset">Wyczyść filtry</button>');
  $('#chips').innerHTML = chips.join('');
  document.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === S.tab));
  $('#panel').setAttribute('aria-labelledby', 'tab-' + S.tab);
  document.querySelectorAll('[data-demo]').forEach(b => b.setAttribute('aria-pressed', b.dataset.demo === S.demo));
}

function renderTotals(rows, err) {
  const sum = k => rows.reduce((a, r) => a + r[k], 0);
  const v = k => (err ? '—' : money(sum(k)));
  $('#kpis').innerHTML = `
    <div class="kpi"><span>Netto</span><strong>${v('netto')}</strong></div>
    <div class="kpi"><span>VAT</span><strong>${v('vat')}</strong></div>
    <div class="kpi main"><span>Brutto</span><strong>${v('brutto')}</strong></div>`;
  const rates = ['23%', 'np'].map(r => ({ r, vat: rows.filter(x => x.stawka === r).reduce((a, x) => a + x.vat, 0) }));
  const max = Math.max(...rates.map(x => x.vat), 0);
  $('#ratesBody').innerHTML = err ? '<p class="hint">Brak danych do wyświetlenia.</p>' : rates.map(x =>
    `<div class="rate"><b>${x.r}</b><div class="bar" role="img" aria-label="Stawka ${x.r}: ${money(x.vat)}"><i style="width:${max ? (x.vat / max) * 100 : 0}%"></i></div><output>${money(x.vat)}</output></div>`).join('');
  $('#ratesPreview').textContent = err ? '' : rates.map(x => `${x.r} · ${money(x.vat)}`).join('  |  ');
}

function visibleCols() { return S.cols.filter(c => c.visible).map(c => colDef(c.key)); }

function cell(r, key) {
  if (key === 'ksef') return r.ksef ? `<span class="status ok">${esc(r.ksef)}</span>` : '<span class="status">Brak potwierdzenia</span>';
  return esc(r[key]);
}
function detail(r) {
  const items = [['Netto', money(r.netto)], ['VAT', money(r.vat)], ['Brutto', money(r.brutto)], ['Stawka VAT', r.stawka],
    ['Rodzaj operacji', r.rodzaj], ['Kod JPK V7', r.jpk], ['Seria dokumentów', r.seria],
    ['Etykiety', r.labels.length ? r.labels.map(l => `<span class="lbl-tag">${esc(l)}</span>`).join('') : '—']];
  return `<dl class="dl">${items.map(([t, v]) => `<div><dt>${t}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
}

function stateBlock(kind) {
  if (kind === 'error') return `<div class="table-card"><div class="state err">
      <div class="ic">${icon('alert')}</div><h2>Nie udało się wczytać rejestru</h2>
      <p>Wystąpił błąd połączenia z serwerem. Dane nie zostały zmienione. Spróbuj ponownie za chwilę.</p>
      <button class="btn primary" type="button" id="retry">${icon('refresh')}Spróbuj ponownie</button></div></div>`;
  const filtered = S.demo !== 'empty' && (S.q || activeFilters().length || !periodIsDefault());
  return `<div class="table-card"><div class="state">
      <div class="ic">${icon('inbox')}</div>
      <h2>${filtered ? 'Brak wyników' : 'Brak dokumentów w rejestrze'}</h2>
      <p>${filtered ? 'Żaden dokument nie pasuje do wybranych filtrów lub wyszukiwania.' : 'W wybranym okresie nie ma jeszcze żadnych zapisów w rejestrze.'}</p>
      ${filtered ? '<button class="btn" type="button" id="emptyReset">Wyczyść filtry</button>' : ''}</div></div>`;
}

function renderResults() {
  const box = $('#results');
  if (S.loading) { renderTotals([], false); box.innerHTML = '<div class="table-card"><div class="skel"><i></i><i></i><i></i><i></i><i></i></div></div>'; return; }
  if (S.demo === 'error') { renderTotals([], true); box.innerHTML = stateBlock('error'); return; }
  const rows = filteredRows();
  renderTotals(rows, false);
  if (!rows.length) { box.innerHTML = stateBlock('empty'); return; }

  const pages = Math.max(1, Math.ceil(rows.length / S.perPage));
  S.page = Math.min(S.page, pages);
  const from = (S.page - 1) * S.perPage, slice = rows.slice(from, from + S.perPage);
  const cols = visibleCols();
  const th = cols.map(c => {
    const sorted = S.sort.key === c.key;
    return `<th scope="col"${sorted ? ` aria-sort="${S.sort.dir > 0 ? 'ascending' : 'descending'}"` : ''}><button type="button" data-sort="${c.key}">${c.label}${icon('sort')}</button></th>`;
  }).join('');
  const body = slice.map(r => {
    const open = S.open.has(r.id);
    return `<tr class="row${open ? ' open' : ''}">${cols.map(c => `<td class="${c.cls || ''}">${cell(r, c.key)}</td>`).join('')}
      <td class="x"><button class="icon-btn sm exp" type="button" data-exp="${r.id}" aria-expanded="${open}" aria-label="Szczegóły dokumentu ${esc(r.numer)}">${icon('chev-down')}</button></td></tr>
      ${open ? `<tr class="detail"><td colspan="${cols.length + 1}">${detail(r)}</td></tr>` : ''}`;
  }).join('');
  const cards = slice.map(r => {
    const open = S.open.has(r.id), first = cols[0] || colDef('kontrahent');
    const rest = cols.slice(1).filter(c => c.key !== 'ksef');
    return `<li class="card-row"><div class="card-top"><strong>${esc(r[first.key] ?? r.kontrahent)}</strong>
      <button class="icon-btn sm exp" type="button" data-exp="${r.id}" aria-expanded="${open}" aria-label="Szczegóły dokumentu ${esc(r.numer)}">${icon('chev-down')}</button></div>
      <div class="card-meta">${rest.map(c => `<span>${c.label}: <b>${esc(r[c.key])}</b></span>`).join('')}</div>
      ${cols.some(c => c.key === 'ksef') ? cell(r, 'ksef') : ''}${open ? detail(r) : ''}</li>`;
  }).join('');

  box.innerHTML = `<div class="table-card">
    <table class="tbl"><thead><tr>${th}<th class="x" scope="col"><span class="sr">Szczegóły</span></th></tr></thead><tbody>${body}</tbody></table>
    <ul class="cards">${cards}</ul>
    <div class="pager"><span class="pager-info">${from + 1}–${from + slice.length} z ${rows.length} zapisów</span>
      <div class="pager-ctl">
        <button class="icon-btn" type="button" id="prev" aria-label="Poprzednia strona"${S.page <= 1 ? ' disabled' : ''}>${icon('chev-left')}</button>
        <span class="pgno" aria-live="polite">${S.page} / ${pages}</span>
        <button class="icon-btn" type="button" id="next" aria-label="Następna strona"${S.page >= pages ? ' disabled' : ''}>${icon('chev-right')}</button>
        <select id="perPage" aria-label="Liczba wierszy na stronie">${[10, 25, 50].map(n => `<option value="${n}"${n === S.perPage ? ' selected' : ''}>${n} na stronie</option>`).join('')}</select>
      </div></div></div>`;
}

function render() { renderSelects(); renderChrome(); renderResults(); }
function load(ms = 450) {
  S.loading = true; renderResults();
  clearTimeout(load.t);
  load.t = setTimeout(() => { S.loading = false; render(); }, ms);
}

/* ───────── okna i menu ───────── */
const dlg = $('#dlg');
function openDialog(title, body, foot) {
  $('#dlgTitle').textContent = title; $('#dlgBody').innerHTML = body; $('#dlgFoot').innerHTML = foot || '';
  dlg.showModal();
}
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => (t.hidden = true), 2400); }

function openSeries() {
  const cur = activeSeries();
  openDialog('Serie dokumentów',
    `<p class="hint">Wybierz serie, które mają być widoczne w rejestrze.</p>` +
    seriesOptions().map(s => `<label class="opt"><input type="checkbox" value="${esc(s)}"${cur.has(s) ? ' checked' : ''}><span class="grow">${esc(s)}</span></label>`).join(''),
    `<button class="btn" value="close">Anuluj</button><button class="btn primary" value="ok" id="dlgOk">Zastosuj</button>`);
  $('#dlgOk').onclick = () => {
    const sel = new Set([...dlg.querySelectorAll('input:checked')].map(i => i.value));
    S.series = sel.size === seriesOptions().length ? null : sel; S.page = 1; render();
  };
}
function openLabels() {
  openDialog('Etykiety',
    `<p class="hint">Pokaż tylko dokumenty z wybranymi etykietami.</p>` +
    LABELS.map(l => `<label class="opt"><input type="checkbox" value="${esc(l)}"${S.labels.has(l) ? ' checked' : ''}><span class="grow">${esc(l)}</span></label>`).join(''),
    `<button class="btn" value="close">Anuluj</button><button class="btn primary" value="ok" id="dlgOk">Zastosuj</button>`);
  $('#dlgOk').onclick = () => { S.labels = new Set([...dlg.querySelectorAll('input:checked')].map(i => i.value)); S.page = 1; render(); };
}
function openColumns() {
  const draw = () => {
    $('#dlgBody').innerHTML = `<p class="hint">Przeciągnij lub użyj strzałek, aby zmienić kolejność kolumn. Odznacz, aby ukryć.</p>` +
      S.cols.map((c, i) => `<div class="opt drag" draggable="true" data-i="${i}"><span class="grip">${icon('grip')}</span>
        <label class="grow" style="display:flex;gap:10px;align-items:center"><input type="checkbox" data-vis="${i}"${c.visible ? ' checked' : ''}>${colDef(c.key).label}</label>
        <button type="button" class="icon-btn sm ghost" data-mv="${i}:-1" aria-label="W górę"${i === 0 ? ' disabled' : ''}>${icon('up')}</button>
        <button type="button" class="icon-btn sm ghost" data-mv="${i}:1" aria-label="W dół"${i === S.cols.length - 1 ? ' disabled' : ''}>${icon('down')}</button></div>`).join('');
  };
  openDialog('Widok tabeli', '', `<button class="btn" type="button" id="colsReset">Przywróć domyślne</button><button class="btn primary" value="ok">Gotowe</button>`);
  draw();
  const body = $('#dlgBody');
  body.onclick = e => {
    const mv = e.target.closest('[data-mv]');
    if (mv) { const [i, d] = mv.dataset.mv.split(':').map(Number); [S.cols[i], S.cols[i + d]] = [S.cols[i + d], S.cols[i]]; draw(); render(); }
  };
  body.onchange = e => {
    const i = e.target.dataset.vis; if (i === undefined) return;
    if (!e.target.checked && S.cols.filter(c => c.visible).length === 1) { e.target.checked = true; toast('Musi pozostać co najmniej jedna kolumna.'); return; }
    S.cols[i].visible = e.target.checked; render();
  };
  let from = null;
  body.ondragstart = e => { from = +e.target.closest('.opt')?.dataset.i; };
  body.ondragover = e => { e.preventDefault(); body.querySelectorAll('.opt').forEach(o => o.classList.toggle('over', o === e.target.closest('.opt'))); };
  body.ondrop = e => {
    e.preventDefault(); const to = +e.target.closest('.opt')?.dataset.i;
    if (from != null && !Number.isNaN(to) && from !== to) { const [m] = S.cols.splice(from, 1); S.cols.splice(to, 0, m); draw(); render(); }
  };
  $('#colsReset').onclick = () => { S.cols = COLS.map(c => ({ key: c.key, visible: true })); draw(); render(); };
}

function exportCsv() {
  const rows = filteredRows();
  if (!rows.length) { toast('Brak danych do eksportu.'); return; }
  const head = ['Kontrahent', 'Data', 'Numer dokumentu', 'Numer KSeF', 'Identyfikator', 'Netto', 'VAT', 'Brutto', 'Stawka', 'Rodzaj operacji', 'Kod JPK V7', 'Seria'];
  const q = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [head.map(q).join(';')].concat(rows.map(r => [r.kontrahent, r.data, r.numer, r.ksef || 'Brak potwierdzenia', r.id, nf.format(r.netto), nf.format(r.vat), nf.format(r.brutto), r.stawka, r.rodzaj, r.jpk, r.seria].map(q).join(';')));
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' })), download: `rejestr-vat-${S.tab === 'sales' ? 'sprzedazy' : 'zakupow'}-${S.year}.csv` });
  document.body.append(a); a.click(); a.remove(); toast(`Pobrano plik CSV (${rows.length} zapisów).`);
}

function resetFilters() { Object.assign(S, DEFAULTS, { q: '', series: null, labels: new Set(), page: 1 }); $('#q').value = ''; render(); }
const MENUS = [['moreBtn', 'moreMenu'], ['bellBtn', 'bellMenu'], ['userBtn', 'userMenu']];
function toggleMenu(open, id = 'moreMenu') {
  MENUS.forEach(([b, m]) => {
    const menu = $('#' + m), want = m === id ? (open === undefined ? menu.hidden : open) : false;
    menu.hidden = !want; $('#' + b).setAttribute('aria-expanded', String(want));
  });
}

/* ───── ramka strony ───── */
const AREAS = [
  { id: 'vat', t: 'Rejestr VAT', icon: 'receipt', tab: 'vat', d: 'Rejestry sprzedaży i zakupów VAT. Dane demonstracyjne, kontekst VAT wymaga potwierdzenia.' },
  { id: 'kpir', t: 'KPiR', icon: 'bank', tab: 'book', d: 'Podatkowa księga przychodów i rozchodów. Wymaga skonfigurowanego okresu księgowego.' },
  { id: 'inc', t: 'Ewidencja przychodów', icon: 'wallet', tab: 'book', d: 'Ewidencja przychodów. Wymaga skonfigurowanego okresu księgowego.' },
  { id: 'full', t: 'Pełne księgi', icon: 'receipt', tab: 'book', d: 'Pełna księgowość. Wymaga skonfigurowanego okresu księgowego.' },
  { id: 'assets', t: 'Majątek', icon: 'archive', tab: 'assets', d: 'Środki trwałe i wyposażenie. Wymaga skonfigurowanego okresu księgowego.' },
  { id: 'checks', t: 'Kontrole', icon: 'check', tab: 'checks', d: 'Kontrole spójności danych. Wymaga skonfigurowanego okresu księgowego.' },
];
const AREA_TITLES = { vat: 'Rejestry i VAT', book: 'Księgowania', assets: 'Majątek', checks: 'Kontrole' };
function renderAreas() {
  $('#areas').innerHTML = AREAS.map(a => `<details class="acc"><summary>${icon(a.icon)}<span>${a.t}</span>${icon('chev-down').replace('class="i"', 'class="i chev"')}</summary>
    <div class="acc-b"><span>${a.d}</span><button class="btn" type="button" data-goto="${a.tab}">Przejdź do zakładki</button></div></details>`).join('');
}
function showArea(id) {
  document.querySelectorAll('[data-area]').forEach(b => b.setAttribute('aria-selected', b.dataset.area === id));
  const other = $('#area-other');
  $('#area-vat').hidden = id !== 'vat'; other.hidden = id === 'vat';
  if (id !== 'vat') other.innerHTML = `<div class="state"><div class="ic">${icon('inbox')}</div><h2>${AREA_TITLES[id]}</h2>
    <p>Ten widok nie jest częścią prototypu — w zadaniu przebudowany jest ekran „Rejestry i VAT”.</p>
    <button class="btn" type="button" data-goto="vat">Wróć do Rejestrów i VAT</button></div>`;
}
const NOTIFS = [
  ['Okres księgowy 2026 wymaga konfiguracji', 'Dzisiaj, 09:12'], ['Rejestr VAT: 12 dokumentów bez potwierdzenia KSeF', 'Dzisiaj, 08:40'],
  ['Zaimportowano 14 dokumentów demonstracyjnych', 'Wczoraj'], ['Zaktualizowano słownik kodów JPK V7', 'Wczoraj'],
];
let unread = 4;
function renderNotifs() {
  $('#notifs').innerHTML = NOTIFS.map(([t, d], i) => `<li class="${i < unread ? 'new' : ''}">${icon('bell')}<div><p>${t}</p><small>${d}</small></div></li>`).join('');
  const dot = $('#bellDot'); dot.hidden = !unread; dot.textContent = unread;
  $('#bellBtn').setAttribute('aria-label', unread ? `Powiadomienia: ${unread} nowe` : 'Powiadomienia');
}


/* ───────── zdarzenia ───────── */
document.addEventListener('click', e => {
  const t = e.target;
  if (!t.closest('.menu-wrap')) toggleMenu(false);
  if (!t.closest('.fold, .acc')) { /* nic */ }
  let el;
  if ((el = t.closest('[data-tab]'))) { S.tab = el.dataset.tab; Object.assign(S, { page: 1, op: 'all', jpk: 'all', series: null, sort: { key: null, dir: 1 }, open: new Set() }); renderSelects(); load(350); }
  else if ((el = t.closest('[data-sort]'))) { const k = el.dataset.sort; S.sort = S.sort.key === k ? (S.sort.dir === 1 ? { key: k, dir: -1 } : { key: null, dir: 1 }) : { key: k, dir: 1 }; S.page = 1; render(); }
  else if ((el = t.closest('[data-exp]'))) { const id = el.dataset.exp; S.open.has(id) ? S.open.delete(id) : S.open.add(id); renderResults(); document.querySelector(`[data-exp="${id}"]`)?.focus(); }
  else if ((el = t.closest('[data-clear]'))) { const k = el.dataset.clear; if (k === 'series') S.series = null; else if (k === 'labels') S.labels = new Set(); else S[k] = 'all'; S.page = 1; render(); }
  else if ((el = t.closest('[data-demo]'))) { S.demo = el.dataset.demo; S.page = 1; load(400); }
  else if ((el = t.closest('[data-act]'))) { toggleMenu(false); ({ labels: openLabels, print: () => window.print(), columns: openColumns })[el.dataset.act](); }
  else if (t.closest('#moreBtn')) toggleMenu(undefined, 'moreMenu');
  else if (t.closest('#bellBtn')) toggleMenu(undefined, 'bellMenu');
  else if (t.closest('#userBtn')) toggleMenu(undefined, 'userMenu');
  else if (t.closest('#readAll')) { unread = 0; renderNotifs(); }
  else if ((el = t.closest('[data-toast]'))) { toggleMenu(false); toast(el.dataset.toast); }
  else if ((el = t.closest('[data-area]'))) showArea(el.dataset.area);
  else if ((el = t.closest('[data-goto]'))) { showArea(el.dataset.goto); document.querySelector('.areatabs').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  else if (t.closest('#scopeClose')) $('#scopeNote').hidden = true;
  else if (t.closest('#filtersBtn')) { const f = $('#filters'), b = $('#filtersBtn'); f.hidden = !f.hidden; b.setAttribute('aria-expanded', String(!f.hidden)); }
  else if (t.closest('#exportBtn')) exportCsv();
  else if (t.closest('#seriesBtn')) openSeries();
  else if (t.closest('#resetBtn, #chipsReset, #emptyReset')) resetFilters();
  else if (t.closest('#retry')) { S.demo = 'filled'; renderAreas(); renderNotifs();
load(600); }
  else if (t.closest('#prev')) { S.page--; renderResults(); }
  else if (t.closest('#next')) { S.page++; renderResults(); }
  else if (t.closest('#ctxBtn')) { const n = $('#ctxNote'); n.hidden = !n.hidden; $('#ctxBtn').setAttribute('aria-expanded', String(!n.hidden)); }
  else if (t.closest('#ctxClose')) { $('#ctxNote').hidden = true; $('#ctxBtn').setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });
$('#q').addEventListener('input', e => { S.q = e.target.value; S.page = 1; renderResults(); });
[['fYear', 'year'], ['fMonth', 'month'], ['fOp', 'op'], ['fJpk', 'jpk']].forEach(([id, k]) =>
  $('#' + id).addEventListener('change', e => { S[k] = e.target.value; S.page = 1; render(); }));
document.addEventListener('change', e => { if (e.target.id === 'perPage') { S.perPage = +e.target.value; S.page = 1; renderResults(); } });
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

renderAreas(); renderNotifs();
load(600);
