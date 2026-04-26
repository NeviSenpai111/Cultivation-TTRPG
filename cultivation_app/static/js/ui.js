// =============================================================================
// ui.js — DOM helpers (h, fields), dialog, notice, picker, debounce.
// =============================================================================

export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (v === true) el.setAttribute(k, '');
    else if (v === false || v == null) { /* skip */ }
    else el.setAttribute(k, v);
  }
  for (const child of children.flat()) {
    if (child == null || child === false) continue;
    el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return el;
}

export function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); }

export function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

// ---- Notice / toast ---------------------------------------------------------
let _noticeTimer;
export function notice(msg, color) {
  const n = document.getElementById('notice');
  n.textContent = msg;
  n.className = 'notice show' + (color ? ' ' + color : '');
  clearTimeout(_noticeTimer);
  _noticeTimer = setTimeout(() => { n.className = 'notice'; }, 2200);
}

// ---- Dialog ----------------------------------------------------------------
export function openDialog({ title, content, actions, wide }) {
  const overlay = document.getElementById('dialog-overlay');
  const holder = document.getElementById('dialog-content');
  document.getElementById('dialog').classList.toggle('wide', !!wide);
  clear(holder);
  if (title) holder.appendChild(h('div', { class: 'dialog-title' }, title));
  if (content) holder.appendChild(content);
  if (actions && actions.length) {
    const footer = h('div', { class: 'dialog-footer' });
    actions.forEach(a => {
      footer.appendChild(h('button', {
        class: 'btn' + (a.primary ? ' primary' : '') + (a.danger ? ' danger' : ''),
        onclick: a.handler
      }, a.label));
    });
    holder.appendChild(footer);
  }
  overlay.classList.add('open');
}

export function closeDialog() {
  document.getElementById('dialog-overlay').classList.remove('open');
}

export function confirmDialog(msg) {
  return new Promise(resolve => {
    openDialog({
      title: 'Confirm',
      content: h('div', {}, h('p', { style: { fontSize: '15px', lineHeight: '1.5' } }, msg)),
      actions: [
        { label: 'Cancel', handler: () => { closeDialog(); resolve(false); } },
        { label: 'Confirm', primary: true, handler: () => { closeDialog(); resolve(true); } }
      ]
    });
  });
}

// Wire global dialog handlers (called once from main.js)
export function initDialog() {
  document.getElementById('dialog-close').addEventListener('click', closeDialog);
  document.getElementById('dialog-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeDialog();
  });
}

// ---- Field helpers ---------------------------------------------------------
export function fieldText(label, value, onChange, opts = {}) {
  const input = h('input', {
    type: opts.type || 'text',
    class: 'field-input',
    value: value || '',
    placeholder: opts.placeholder || ''
  });
  input.addEventListener('input', () => onChange(input.value));
  return h('div', { class: 'field' },
    h('label', { class: 'field-label' }, label), input);
}

export function fieldNumber(label, value, onChange, opts = {}) {
  const input = h('input', {
    type: 'number',
    class: 'field-input',
    value: value != null ? value : '',
    min: opts.min != null ? opts.min : '',
    max: opts.max != null ? opts.max : '',
    step: opts.step || '1'
  });
  input.addEventListener('input', () => {
    const v = input.value === '' ? null : Number(input.value);
    onChange(v);
  });
  return h('div', { class: 'field' },
    h('label', { class: 'field-label' }, label), input);
}

export function fieldSelect(label, value, options, onChange, opts = {}) {
  const sel = h('select', { class: 'field-select' });
  if (opts.allowEmpty) sel.appendChild(h('option', { value: '' }, '— choose —'));
  options.forEach(o => {
    const [val, disp] = Array.isArray(o) ? o : [o, o];
    const optEl = h('option', { value: val }, disp);
    if (val === value) optEl.setAttribute('selected', '');
    sel.appendChild(optEl);
  });
  sel.value = value || '';
  sel.addEventListener('change', () => onChange(sel.value));
  return h('div', { class: 'field' },
    h('label', { class: 'field-label' }, label), sel);
}

export function fieldTextarea(label, value, onChange, placeholder) {
  const area = h('textarea', { class: 'field-textarea', placeholder: placeholder || '' }, value || '');
  area.addEventListener('input', () => onChange(area.value));
  return h('div', { class: 'field' },
    h('label', { class: 'field-label' }, label), area);
}

export function sectionHeader(cn, en) {
  return h('div', { class: 'section-header' },
    h('h2', {}, cn),
    h('span', { class: 'en' }, en));
}

// ---- Picker (modal for selecting an entry from a list) ---------------------
export function openPicker({ title, entries, subtitleFn, onPick }) {
  const body = h('div', {});
  const search = h('input', { class: 'picker-search', placeholder: 'Filter…' });
  body.appendChild(search);
  const list = h('div', { class: 'picker-list' });
  body.appendChild(list);

  const renderList = () => {
    clear(list);
    const q = search.value.toLowerCase().trim();
    let filtered = entries;
    if (q) {
      filtered = entries.filter(e =>
        (e.name || '').toLowerCase().includes(q) ||
        (e.effect || '').toLowerCase().includes(q) ||
        (e.description || '').toLowerCase().includes(q));
    }
    filtered = [...filtered].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    if (!filtered.length) {
      list.appendChild(h('div', { class: 'list-empty' }, 'No matches. Add entries in the Library first.'));
      return;
    }
    filtered.forEach(e => {
      const item = h('div', { class: 'picker-item', onclick: () => onPick(e) });
      item.appendChild(h('div', { class: 'picker-item-name' }, e.name || '(Unnamed)'));
      const sub = subtitleFn ? subtitleFn(e) : '';
      if (sub) item.appendChild(h('div', { class: 'picker-item-meta' }, sub));
      if (e.effect) item.appendChild(h('div', {
        style: { fontSize: '13px', color: 'var(--ink-soft)', marginTop: '3px' }
      }, e.effect));
      list.appendChild(item);
    });
  };
  renderList();
  search.addEventListener('input', renderList);
  setTimeout(() => search.focus(), 50);

  openDialog({
    title,
    content: body,
    actions: [{ label: 'Cancel', handler: closeDialog }]
  });
}

// ---- ID generator -----------------------------------------------------------
export function uid() {
  return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

export function nowIso() { return new Date().toISOString(); }
