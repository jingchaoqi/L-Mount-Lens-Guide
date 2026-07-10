// Shared "lens comparison" state: which lens ids are queued up for the
// /compare page, plus the UI that reflects that state — the add/remove
// toggle buttons on cards/table rows, the floating "Compare lenses (N)"
// widget (button + expandable panel listing queued lenses), and (on the
// compare page itself) the comparison columns.
//
// Persisted to localStorage using the same convention as i18n.js's
// language preference, so the selection survives navigation and refresh.
// Runs on every page (wired in Layout.astro) so the widget and the
// selection stay consistent no matter where the visitor is.

import { dict } from '../lib/i18n-dict.js';

const STORAGE_KEY = 'lmount-compare';

// Kept in sync by hand with CompareToggleButton.astro's icon — this is
// the only place a client-rendered (non-Astro) copy of it is needed,
// since the comparison panel's list items are built dynamically from
// whatever lenses happen to be selected, not server-rendered per lens.
const PLUS_ICON_SVG = '<svg class="compare-toggle__icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">'
  + '<path d="M12 4v16M4 12h16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" /></svg>';

function readIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

let ids = readIds();

function writeIds() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore write failures (privacy mode, storage full, etc.)
  }
}

function has(id) {
  return ids.includes(id);
}

// Whether the floating panel (the queued-lens list above the bar) is
// currently expanded. Purely transient UI state, not persisted — every
// page load starts collapsed regardless of how many lenses are queued.
let panelOpen = false;

function render() {
  if (ids.length === 0 && panelOpen) {
    panelOpen = false;
    applyPanelOpenState();
  } else if (panelOpen) {
    rebuildPanelList();
  }
  updateToggleButtons();
  updateBarLabel();
  updateWidgetVisibility();
  updateComparePage();
}

function notify() {
  writeIds();
  document.dispatchEvent(new CustomEvent('compare:change', { detail: { ids: [...ids] } }));
  render();
}

function add(id) {
  if (has(id)) return;
  ids.push(id);
  notify();
}

function remove(id) {
  const next = ids.filter((x) => x !== id);
  if (next.length === ids.length) return;
  ids = next;
  notify();
}

function toggle(id) {
  if (has(id)) remove(id);
  else add(id);
}

function clear() {
  if (ids.length === 0) return;
  ids = [];
  notify();
}

window.__compare = {
  ids: () => [...ids],
  has,
  add,
  remove,
  toggle,
  clear,
};

function translate(key, vars) {
  return window.__i18n ? window.__i18n.t(key, vars) : key;
}

function translateBrand(brand) {
  const lang = window.__i18n ? window.__i18n.lang : 'en';
  return (dict[lang] && dict[lang][`brand.${brand}`]) || dict.en[`brand.${brand}`] || brand;
}

function updateToggleButtons() {
  document.querySelectorAll('[data-compare-toggle]').forEach((btn) => {
    const id = btn.dataset.lensId;
    const active = has(id);
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
    const label = translate(active ? 'compare.remove' : 'compare.add');
    btn.setAttribute('aria-label', label);
    btn.title = label;
  });
}

// Minimal id -> {brand, model} lookup, embedded once in Layout.astro so
// the panel can show human-readable names on any page — not just the
// home page, where the full card/table markup happens to be in the DOM.
const LENS_INDEX = new Map();
try {
  const raw = document.getElementById('lens-index');
  if (raw) {
    JSON.parse(raw.textContent).forEach((lens) => LENS_INDEX.set(lens.id, lens));
  }
} catch {
  // Missing/invalid index — panel falls back to showing raw ids below.
}

function rebuildPanelList() {
  const list = document.getElementById('compare-panel-list');
  if (!list) return;
  list.innerHTML = '';
  ids.forEach((id) => {
    const meta = LENS_INDEX.get(id);
    const li = document.createElement('li');
    li.className = 'compare-panel__item';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'compare-panel__item-name';
    nameSpan.textContent = meta ? `${translateBrand(meta.brand)} ${meta.model}` : id;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'compare-toggle is-active compare-panel__item-remove';
    removeBtn.setAttribute('data-compare-toggle', '');
    removeBtn.setAttribute('data-lens-id', id);
    removeBtn.innerHTML = PLUS_ICON_SVG;

    li.append(nameSpan, removeBtn);
    list.appendChild(li);
  });
}

let comparePanelHideTimer = null;

function applyPanelOpenState() {
  const panel = document.getElementById('compare-panel');
  const bar = document.getElementById('compare-bar');
  if (!panel) return;
  if (bar) bar.setAttribute('aria-expanded', String(panelOpen));

  if (comparePanelHideTimer) {
    clearTimeout(comparePanelHideTimer);
    comparePanelHideTimer = null;
  }

  if (panelOpen) {
    rebuildPanelList();
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add('is-open'));
  } else {
    panel.classList.remove('is-open');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      panel.hidden = true;
    } else {
      // Matches the .compare-panel opacity/transform transition duration
      // in global.css, plus a small buffer.
      comparePanelHideTimer = setTimeout(() => {
        panel.hidden = true;
        comparePanelHideTimer = null;
      }, 200);
    }
  }
}

// Timestamp of the panel's last open transition — used to ignore scroll
// events that fire immediately after opening (e.g. mobile browsers
// showing/hiding their address bar in response to the very tap/click
// that opened the panel, which itself dispatches a scroll event with no
// real user scrolling involved). See the scroll listener below.
let panelOpenedAt = 0;

function setPanelOpen(open) {
  const wasOpen = panelOpen;
  panelOpen = open && ids.length > 0;
  if (panelOpen && !wasOpen) {
    panelOpenedAt = Date.now();
  }
  applyPanelOpenState();
  updateBarLabel();
}

function updateBarLabel() {
  const bar = document.getElementById('compare-bar');
  if (!bar) return;
  bar.classList.toggle('is-armed', panelOpen);

  // Both labels stay in the DOM at all times (see .compare-bar__label-stack
  // in global.css) so the button's box size is always the larger of the
  // two — only which one is visible toggles. This keeps the button from
  // resizing when it swaps between "Compare lenses (N)" and
  // "Start comparing" (they're rarely the same width).
  const idleEl = bar.querySelector('[data-compare-count-text]');
  const armedEl = bar.querySelector('[data-compare-armed-text]');
  if (idleEl) {
    idleEl.textContent = translate('compare.floatingButton', { count: ids.length });
    idleEl.classList.toggle('is-current', !panelOpen);
  }
  if (armedEl) {
    armedEl.textContent = translate('compare.startComparing');
    armedEl.classList.toggle('is-current', panelOpen);
  }
}

let compareWidgetInitialized = false;
// Matches the .compare-widget opacity/transform transition duration in
// global.css, plus a small buffer. A plain timer (cleared on every call)
// is simpler and more robust than transitionend here — rapid toggling
// (add, remove, add again) can interrupt a transition before it fires
// transitionend, which would otherwise leave a stale listener that hides
// the widget again after it was already shown back.
const COMPARE_WIDGET_HIDE_DELAY_MS = 220;
let compareWidgetHideTimer = null;

function updateWidgetVisibility() {
  const widget = document.getElementById('compare-widget');
  if (!widget) return;

  const count = ids.length;
  const onComparePage = !!document.getElementById('compare-grid');
  const shouldShow = count > 0 && !onComparePage;

  if (!compareWidgetInitialized) {
    // First render (page load): reflect persisted state instantly, no
    // entrance animation — only live add/remove actions should fade.
    compareWidgetInitialized = true;
    widget.hidden = !shouldShow;
    if (shouldShow) widget.classList.add('is-visible');
    return;
  }

  if (compareWidgetHideTimer) {
    clearTimeout(compareWidgetHideTimer);
    compareWidgetHideTimer = null;
  }

  if (shouldShow) {
    widget.hidden = false;
    // Force a reflow before adding the class so the fade-in transition plays
    // (toggling hidden and the class in the same tick would skip it).
    requestAnimationFrame(() => widget.classList.add('is-visible'));
  } else {
    widget.classList.remove('is-visible');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      widget.hidden = true;
    } else {
      compareWidgetHideTimer = setTimeout(() => {
        widget.hidden = true;
        compareWidgetHideTimer = null;
      }, COMPARE_WIDGET_HIDE_DELAY_MS);
    }
  }
}

function updateComparePage() {
  const grid = document.getElementById('compare-grid');
  const empty = document.getElementById('compare-empty');
  if (!grid) return;

  const columns = Array.from(grid.querySelectorAll('.compare-column'));
  let visibleCount = 0;

  for (const col of columns) {
    const active = has(col.dataset.lensId);
    col.hidden = !active;
    if (active) visibleCount += 1;
  }

  // Reorder columns to match selection order (mirrors filter.js's
  // sortRows()-then-appendChild reordering of card/table rows).
  ids.forEach((id) => {
    const col = columns.find((c) => c.dataset.lensId === id);
    if (col) grid.appendChild(col);
  });

  grid.hidden = visibleCount === 0;
  if (empty) empty.hidden = visibleCount !== 0;
}

document.addEventListener('click', (event) => {
  const toggleBtn = event.target.closest('[data-compare-toggle]');
  if (toggleBtn) {
    event.preventDefault();
    event.stopPropagation();
    toggle(toggleBtn.dataset.lensId);
    return;
  }

  const clearBtn = event.target.closest('#compare-clear-all');
  if (clearBtn) {
    event.preventDefault();
    clear();
    return;
  }

  const bar = event.target.closest('#compare-bar');
  if (bar) {
    event.preventDefault();
    if (panelOpen) {
      const href = bar.dataset.href;
      if (href) window.location.href = href;
    } else {
      setPanelOpen(true);
    }
    return;
  }

  // Clicking anywhere outside the widget closes an open panel — not
  // Escape, not moving the mouse away, just a click outside (the panel
  // itself is inside #compare-widget, so clicks on its list/clear button
  // never reach this branch) or scrolling the page (see the scroll
  // listener below). Deliberate: the panel is meant to stay open/armed
  // once hovered or clicked open, until the user explicitly moves on.
  const widget = document.getElementById('compare-widget');
  if (panelOpen && widget && !widget.contains(event.target)) {
    setPanelOpen(false);
  }
});

// Scrolling the page counts the same as clicking outside — the user has
// moved on, so close the panel. `capture: true` catches scroll events
// from any scrollable element (scroll doesn't bubble, but it does still
// reach capture-phase listeners on ancestors); `passive: true` since this
// handler never calls preventDefault, which matters for scroll perf on
// touch devices. Scrolling *inside* the panel's own (possibly long)
// queued-lens list is excluded — that's normal use, not "moving on".
window.addEventListener('scroll', (event) => {
  if (!panelOpen) return;
  const panel = document.getElementById('compare-panel');
  if (panel && panel.contains(event.target)) return;
  // Ignore scroll events fired immediately after opening — on mobile,
  // the tap that opens the panel can itself trigger the browser chrome
  // (address bar) to show/hide, which dispatches a scroll event with no
  // actual user scrolling involved.
  if (Date.now() - panelOpenedAt < 150) return;
  setPanelOpen(false);
}, { capture: true, passive: true });

document.addEventListener('i18n:change', render);

function init() {
  // Hovering the bar behaves like clicking it while idle — opens the
  // panel and arms the button — but never triggers the navigate branch
  // (that still requires an actual click on the now-armed button).
  // Moving the mouse away deliberately does not close it back up; only
  // clicking outside the widget or scrolling the page does (see the
  // listeners above).
  //
  // Uses `pointerenter` + a `pointerType === 'mouse'` check, not
  // `mouseenter` — touch browsers fire a synthetic hover-like event
  // right before the `click` from a tap, and `mouseenter` can't tell
  // that apart from a real mouse hover. Without this check, a single tap
  // on mobile would open the panel (via the false "hover") and then the
  // very same tap's `click` would see it as already armed and navigate
  // immediately — collapsing the two-step interaction into an
  // accidental one-tap jump to `/compare`. `pointerType` is the reliable
  // signal; touch/pen pointers are ignored here entirely.
  const bar = document.getElementById('compare-bar');
  if (bar) {
    bar.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      if (!panelOpen) setPanelOpen(true);
    });
  }

  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
