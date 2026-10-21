#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { isFieldVerified } from '../src/lib/verification.js';
import { LOCALES } from '../src/lib/locales.js';
import { AUDITED_FIELDS } from './validate-audit.mjs';

const lenses = JSON.parse(readFileSync('src/data/lenses.json', 'utf8'));
const detailFields = AUDITED_FIELDS.filter((field) => !['model', 'notes', 'focalLengthMax'].includes(field));
let checked = 0;
let withheld = 0;
for (const locale of LOCALES) {
  const prefix = locale.code === 'en' ? '' : `${locale.code}/`;
  const pending = locale.code === 'en' ? 'Awaiting confirmation' : '待核实';
  const home = readFileSync(`dist/${prefix}index.html`, 'utf8');
  const compare = readFileSync(`dist/${prefix}compare/index.html`, 'utf8');
  const audit = readFileSync(`dist/${prefix}data-audit/index.html`, 'utf8');
  for (const lens of lenses) {
    const html = readFileSync(`dist/${prefix}lenses/${lens.id}/index.html`, 'utf8');
    assert.ok(html.includes(`lang="${locale.htmlLang}"`), lens.id);
    assert.ok(audit.includes(`data-audit-lens="${lens.id}"`), lens.id);
    const published = lens.verification.mountConfirmed;
    assert.equal(home.includes(`data-lens-id="${lens.id}"`), published, `directory membership: ${lens.id}`);
    assert.equal(compare.includes(`data-lens-id="${lens.id}"`), published, `comparison membership: ${lens.id}`);
    if (published) {
      const rows = [...home.matchAll(/<(?:div|tr)\s[^>]*data-lens-row[^>]*>/g)]
        .map((match) => match[0]).filter((tag) => tag.includes(`data-lens-id="${lens.id}"`));
      assert.equal(rows.length, 2, `card and table row: ${lens.id}`);
      for (const [field, attribute] of [['weightGram', 'weight'], ['releaseYear', 'release-year'], ['maxAperture', 'max-aperture'], ['format', 'format'], ['focusType', 'focus-type']]) {
        for (const row of rows) {
          assert.equal(row.includes(`data-${attribute}="`), isFieldVerified(lens, field), `${lens.id}: unconfirmed ${field} leaked to filter/sort attributes`);
        }
      }
    }
    assert.equal(html.includes('content="noindex, follow"'), !published, `indexing: ${lens.id}`);
    for (const field of detailFields) {
      const cell = html.match(new RegExp(`<td data-spec="${field}">([^<]*)</td>`));
      assert.ok(cell, `${lens.id}: missing ${field} cell`);
      if (!isFieldVerified(lens, field)) {
        assert.equal(cell[1], pending, `${lens.id}: unconfirmed ${field} leaked to detail`);
        withheld += 1;
        if (published) {
          const columnStart = compare.indexOf(`class="compare-column" data-lens-id="${lens.id}"`);
          assert.ok(columnStart >= 0, lens.id);
          const next = compare.indexOf('class="compare-column"', columnStart + 1);
          const column = compare.slice(columnStart, next < 0 ? undefined : next);
          assert.ok(column.includes(`data-spec="${field}">${pending}</div>`), `${lens.id}: unconfirmed ${field} leaked to compare`);
        }
      } else {
        assert.notEqual(cell[1], pending, `${lens.id}: confirmed ${field} unexpectedly missing`);
      }
    }
    if (!isFieldVerified(lens, 'notes')) {
      assert.ok(!html.includes(lens.notes[locale.code] ?? lens.notes.en), `unconfirmed note leaked: ${lens.id}`);
    }
    checked += 1;
  }
}
const count = readdirSync('dist', { recursive: true }).filter((path) => path.endsWith('.html')).length;
assert.equal(count, LOCALES.length * (lenses.length + 4));
console.log(`Rendered audit passed: ${checked} localized detail pages, ${withheld} unconfirmed spec cells withheld, ${count} total pages. Directory, comparison, audit records and noindex policy match evidence states.`);
