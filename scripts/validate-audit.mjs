#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

export const AUDITED_FIELDS = [
  'model', 'mount', 'allianceMember', 'format', 'lensType', 'focusType',
  'focalLengthMin', 'focalLengthMax', 'maxAperture', 'minAperture', 'weightGram',
  'filterThreadMm', 'minFocusDistanceM', 'maxMagnification', 'stabilization',
  'weatherSealed', 'releaseYear', 'notes',
];

export function validateAudit(lenses, report) {
  assert.match(report.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(report.entries.length, lenses.length, 'Every stored lens needs a review record');
  const entries = new Map();
  for (const entry of report.entries) {
    assert.ok(!entries.has(entry.id), `Duplicate audit id: ${entry.id}`);
    entries.set(entry.id, entry);
  }
  for (const lens of lenses) {
    const entry = entries.get(lens.id);
    assert.ok(entry, `Missing audit: ${lens.id}`);
    const audit = lens.verification;
    assert.ok(audit, `Missing verification metadata: ${lens.id}`);
    assert.equal(audit.checkedAt, report.checkedAt, lens.id);
    assert.equal(audit.mountConfirmed, entry.mountConfirmed, lens.id);
    assert.deepEqual(audit.verifiedFields, entry.verifiedFields, lens.id);
    assert.deepEqual(audit.unresolvedFields, entry.unresolvedFields, lens.id);
    assert.equal(typeof audit.mountConfirmed, 'boolean', lens.id);
    const verified = new Set(audit.verifiedFields);
    const pending = new Set(audit.unresolvedFields);
    assert.equal(verified.size, audit.verifiedFields.length, lens.id);
    assert.equal(pending.size, audit.unresolvedFields.length, lens.id);
    for (const field of [...AUDITED_FIELDS, ...['maxApertureTele', 'minApertureWide'].filter((key) => key in lens)]) {
      assert.ok(verified.has(field) !== pending.has(field), `${lens.id}: ${field} must have exactly one evidence state`);
    }
    for (const field of verified) {
      assert.ok(Object.hasOwn(entry.confirmedValues, field), `${lens.id}: no recorded value for ${field}`);
      assert.deepEqual(lens[field], entry.confirmedValues[field], `${lens.id}: ${field} changed without an updated evidence record`);
    }
    assert.equal(verified.has('mount'), audit.mountConfirmed, lens.id);
    assert.ok(entry.sources.length > 0, `${lens.id}: missing source attempts`);
    for (const source of entry.sources) {
      assert.ok(['http:', 'https:'].includes(new URL(source.url).protocol), lens.id);
      assert.ok(typeof source.excerpt === 'string' && source.excerpt.trim(), lens.id);
    }
    for (const [field, corrected] of Object.entries(entry.corrections)) {
      assert.deepEqual(lens[field], corrected, `${lens.id}: unapplied correction ${field}`);
    }
    if ('maxApertureTele' in lens) assert.ok(lens.maxApertureTele >= lens.maxAperture, lens.id);
    if ('minApertureWide' in lens) assert.ok(lens.minApertureWide <= lens.minAperture, lens.id);
  }
  return { reviewed: lenses.length, confirmedMount: lenses.filter((lens) => lens.verification.mountConfirmed).length };
}

if (process.argv[1] && new URL(import.meta.url).pathname === process.argv[1]) {
  try {
    const lenses = JSON.parse(readFileSync(new URL('../src/data/lenses.json', import.meta.url), 'utf8'));
    const report = JSON.parse(readFileSync(new URL('../docs/lens-audit-2026-10-21.json', import.meta.url), 'utf8'));
    const result = validateAudit(lenses, report);
    console.log(`Audit coverage passed: ${result.reviewed} reviewed, ${result.confirmedMount} confirmed L-Mount versions. This is an evidence-coverage check, not independent fact verification.`);
  } catch (error) {
    console.error(`Audit validation failed: ${error.message}`);
    process.exitCode = 1;
  }
}
