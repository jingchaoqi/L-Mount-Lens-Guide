// Client-side filter / sort / view toggle for the lens list page.
// Works against server-rendered card + table rows, matched in pairs by
// the shared `data-lens-id` attribute, so no data is re-fetched or
// re-rendered in JS.

function init() {
  const searchInput = document.getElementById('search-input');
  const selects = Array.from(document.querySelectorAll('[data-filter]'));
  const sortSelect = document.getElementById('sort-select');
  const clearBtn = document.getElementById('clear-filters');
  const viewToggle = document.getElementById('view-toggle');
  const viewContainer = document.getElementById('view-container');
  const filterCount = document.getElementById('filter-count');
  const noResults = document.getElementById('no-results');
  const lensGrid = document.getElementById('lens-grid');
  const tableBody = document.querySelector('#lens-table-wrap tbody');

  const focalRangeEl = document.getElementById('focal-range');
  const focalMinInput = document.getElementById('focal-range-min-input');
  const focalMaxInput = document.getElementById('focal-range-max-input');
  const focalFill = document.getElementById('focal-range-fill');
  const focalValueLabel = document.getElementById('focal-range-value');
  const focalTicksEl = document.getElementById('focal-range-ticks');
  const focalTickButtons = focalTicksEl ? Array.from(focalTicksEl.querySelectorAll('[data-focal-value]')) : [];

  // The slider inputs run on a log-scale raw domain (0-1000), not raw mm —
  // see the matching comment in FilterBar.astro. These helpers convert
  // between a thumb's raw position and the real focal length it represents.
  const focalBoundsMin = focalRangeEl ? Number(focalRangeEl.dataset.focalMin) : 0;
  const focalBoundsMax = focalRangeEl ? Number(focalRangeEl.dataset.focalMax) : 0;
  const focalLogMin = Math.log(focalBoundsMin || 1);
  const focalLogMax = Math.log(focalBoundsMax || 1);

  function focalRawToMm(raw) {
    const t = raw / 1000;
    return Math.round(Math.exp(focalLogMin + t * (focalLogMax - focalLogMin)));
  }

  function focalMmToRaw(mm) {
    const t = (Math.log(mm) - focalLogMin) / (focalLogMax - focalLogMin);
    return Math.round(t * 1000);
  }

  const cardRows = Array.from(document.querySelectorAll('#lens-grid [data-lens-row]'));
  const tableRows = Array.from(document.querySelectorAll('#lens-table-wrap [data-lens-row]'));
  const totalCount = cardRows.length;

  // Native range thumbs travel between `thumbSize / 2` and `100% - thumbSize / 2`
  // (their box, not their center, stays inside the track), so a plain
  // percentage of the container places ticks/fill slightly off from where the
  // thumb actually renders. This mirrors the `calc()` used for tick marks in
  // FilterBar.astro — keep the 16px in sync with the thumb's CSS width.
  const focalThumbSizePx = 16;
  function focalRawToTrackPercent(raw, trackWidthPx) {
    if (!trackWidthPx) return (raw / 1000) * 100;
    const usablePx = trackWidthPx - focalThumbSizePx;
    const centerPx = focalThumbSizePx / 2 + (raw / 1000) * usablePx;
    return (centerPx / trackWidthPx) * 100;
  }

  function updateFocalSliderUI() {
    if (!focalMinInput || !focalMaxInput) return;
    const minRaw = Number(focalMinInput.value);
    const maxRaw = Number(focalMaxInput.value);
    const trackWidthPx = focalRangeEl ? focalRangeEl.getBoundingClientRect().width : 0;
    const leftPct = focalRawToTrackPercent(minRaw, trackWidthPx);
    const rightPct = focalRawToTrackPercent(maxRaw, trackWidthPx);
    focalFill.style.left = `${leftPct}%`;
    focalFill.style.width = `${Math.max(rightPct - leftPct, 0)}%`;

    const minMm = focalRawToMm(minRaw);
    const maxMm = focalRawToMm(maxRaw);
    focalValueLabel.textContent = `${minMm}mm – ${maxMm}mm`;

    // Only highlight ticks once the range has actually been narrowed — at the
    // full default range, the endpoints happen to equal the min/max ticks.
    const isNarrowed = minRaw > 0 || maxRaw < 1000;
    focalTickButtons.forEach((btn) => {
      const tickVal = Number(btn.dataset.focalValue);
      btn.classList.toggle('is-active', isNarrowed && (tickVal === minMm || tickVal === maxMm));
    });
  }

  function matches(row) {
    const search = searchInput.value.trim().toLowerCase();
    if (search && !row.dataset.search.includes(search)) return false;

    for (const select of selects) {
      if (select.tagName !== 'SELECT') continue;
      const key = select.dataset.filter;
      const value = select.value;
      if (value === 'all') continue;

      if (key === 'brand' && row.dataset.brand !== value) return false;
      if (key === 'format' && row.dataset.format !== value) return false;
      if (key === 'focusType' && row.dataset.focusType !== value) return false;
      if (key === 'lensType' && row.dataset.lensType !== value) return false;
      if (key === 'alliance' && row.dataset.alliance !== value) return false;
      if (key === 'weight' && row.dataset.weightBucket !== value) return false;
    }

    if (focalMinInput && focalMaxInput) {
      const minRaw = Number(focalMinInput.value);
      const maxRaw = Number(focalMaxInput.value);
      if (minRaw > 0 || maxRaw < 1000) {
        const selMin = focalRawToMm(minRaw);
        const selMax = focalRawToMm(maxRaw);
        // Overlap test (not containment): a zoom lens like 24-70mm should still
        // show up if only part of its range falls inside the selected slider range.
        const rowMin = Number(row.dataset.focalMin);
        const rowMax = Number(row.dataset.focalMax);
        if (rowMax < selMin || rowMin > selMax) return false;
      }
    }

    return true;
  }

  function sortValue(row, key) {
    switch (key) {
      case 'focal-asc':
        // Zooms sort by their shortest reach, e.g. a 16-35mm ranks by 16mm.
        return Number(row.dataset.focalMin);
      case 'focal-desc':
        // ...and by their longest reach when sorting the other way, e.g.
        // a 100-400mm ranks by 400mm, not 100mm.
        return Number(row.dataset.focalMax);
      case 'aperture-asc':
        return Number(row.dataset.maxAperture);
      case 'weight-asc':
      case 'weight-desc':
        return Number(row.dataset.weight);
      case 'year-asc':
      case 'year-desc':
        return Number(row.dataset.releaseYear);
      default:
        return row.dataset.brand.toLowerCase();
    }
  }

  function sortRows(rows, sortKey) {
    const descending = sortKey.endsWith('-desc');
    const sorted = [...rows].sort((a, b) => {
      const va = sortValue(a, sortKey);
      const vb = sortValue(b, sortKey);
      if (va < vb) return descending ? 1 : -1;
      if (va > vb) return descending ? -1 : 1;
      return a.dataset.search.localeCompare(b.dataset.search);
    });
    return sorted;
  }

  function applyFilters() {
    const sortKey = sortSelect.value;
    let visibleCount = 0;

    for (const row of cardRows) {
      const isMatch = matches(row);
      row.hidden = !isMatch;
      if (isMatch) visibleCount += 1;
    }
    for (const row of tableRows) {
      row.hidden = !matches(row);
    }

    // Reorder both views according to the selected sort.
    const sortedCards = sortRows(cardRows, sortKey);
    sortedCards.forEach((row) => lensGrid.appendChild(row));
    const sortedTableRows = sortRows(tableRows, sortKey);
    sortedTableRows.forEach((row) => tableBody.appendChild(row));

    filterCount.textContent = window.__i18n
      ? window.__i18n.t('filterBar.showingCount', { count: visibleCount, total: totalCount })
      : `Showing ${visibleCount} of ${totalCount} lenses`;
    noResults.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener('input', applyFilters);
  selects.forEach((el) => el.addEventListener('change', applyFilters));
  sortSelect.addEventListener('change', applyFilters);

  if (focalMinInput && focalMaxInput) {
    // Keep the two thumbs from crossing, and raise whichever one the user is
    // actively dragging above the other so it stays grabbable once they meet.
    focalMaxInput.style.zIndex = '2';
    focalMinInput.style.zIndex = '1';

    focalMinInput.addEventListener('pointerdown', () => {
      focalMinInput.style.zIndex = '2';
      focalMaxInput.style.zIndex = '1';
    });
    focalMaxInput.addEventListener('pointerdown', () => {
      focalMaxInput.style.zIndex = '2';
      focalMinInput.style.zIndex = '1';
    });

    focalMinInput.addEventListener('input', () => {
      if (Number(focalMinInput.value) > Number(focalMaxInput.value)) {
        focalMinInput.value = focalMaxInput.value;
      }
      updateFocalSliderUI();
      applyFilters();
    });
    focalMaxInput.addEventListener('input', () => {
      if (Number(focalMaxInput.value) < Number(focalMinInput.value)) {
        focalMaxInput.value = focalMinInput.value;
      }
      updateFocalSliderUI();
      applyFilters();
    });
    // The thumb-inset correction above depends on the track's rendered
    // width, so re-sync the fill bar when that width changes.
    window.addEventListener('resize', updateFocalSliderUI);
  }

  if (focalTicksEl) {
    focalTicksEl.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-focal-value]');
      if (!btn) return;
      const targetRaw = focalMmToRaw(Number(btn.dataset.focalValue));
      const minRaw = Number(focalMinInput.value);
      const maxRaw = Number(focalMaxInput.value);
      // Move whichever thumb is currently closer to the clicked focal length —
      // the other thumb stays put, so this is still a two-handle range, just
      // nudging one endpoint at a time.
      if (Math.abs(targetRaw - minRaw) <= Math.abs(targetRaw - maxRaw)) {
        focalMinInput.value = String(Math.min(targetRaw, maxRaw));
      } else {
        focalMaxInput.value = String(Math.max(targetRaw, minRaw));
      }
      updateFocalSliderUI();
      applyFilters();
    });
  }

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    selects.forEach((el) => {
      if (el.tagName === 'SELECT') el.value = 'all';
    });
    if (focalMinInput && focalMaxInput) {
      focalMinInput.value = '0';
      focalMaxInput.value = '1000';
      updateFocalSliderUI();
    }
    applyFilters();
  });

  if (viewToggle) {
    viewToggle.addEventListener('click', (event) => {
      const btn = event.target.closest('button[data-view]');
      if (!btn) return;
      viewToggle.querySelectorAll('button').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      viewContainer.classList.remove('view-cards', 'view-table');
      viewContainer.classList.add(`view-${btn.dataset.view}`);
    });
  }

  document.addEventListener('i18n:change', applyFilters);

  updateFocalSliderUI();
  applyFilters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
