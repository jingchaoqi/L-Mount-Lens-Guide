import test from 'node:test';
import assert from 'node:assert/strict';
import { isFieldVerified, verifiedAttribute, compareKnownValues } from '../src/lib/verification.js';
import { validateAudit, AUDITED_FIELDS } from '../scripts/validate-audit.mjs';

const fixture = () => ({
  id: 'sample-lens', mount: 'L-Mount', weightGram: 999, stabilization: false,
  verification: { checkedAt: '2026-10-21', mountConfirmed: true, verifiedFields: ['mount'], unresolvedFields: ['weightGram', 'stabilization'] },
});

test('legacy values and false booleans cannot be presented as confirmed without evidence', () => {
  assert.equal(isFieldVerified({ weightGram: 999 }, 'weightGram'), false);
  const lens = fixture();
  assert.equal(verifiedAttribute(lens, 'weightGram'), undefined);
  assert.equal(verifiedAttribute(lens, 'stabilization'), undefined);
  lens.verification.verifiedFields.push('weightGram');
  assert.equal(isFieldVerified(lens, 'weightGram'), false, 'conflicting evidence fails closed');
  lens.verification.unresolvedFields = ['stabilization'];
  assert.equal(verifiedAttribute(lens, 'weightGram'), 999);
});

test('confirmed zero/false/null are distinct from missing evidence', () => {
  const lens = fixture();
  Object.assign(lens, { maxMagnification: 0, filterThreadMm: null });
  lens.verification.verifiedFields.push('stabilization', 'maxMagnification', 'filterThreadMm');
  lens.verification.unresolvedFields = ['weightGram'];
  assert.equal(verifiedAttribute(lens, 'stabilization'), false);
  assert.equal(verifiedAttribute(lens, 'maxMagnification'), 0);
  assert.equal(verifiedAttribute(lens, 'filterThreadMm'), null);
  lens.verification.mountConfirmed = false;
  assert.equal(isFieldVerified(lens, 'mount'), false);
});

test('unknown measurements sort last in both directions', () => {
  const values = [undefined, 1000, NaN, 200];
  assert.deepEqual([...values].sort((a, b) => compareKnownValues(a, b)).slice(0, 2), [200, 1000]);
  assert.deepEqual([...values].sort((a, b) => compareKnownValues(a, b, true)).slice(0, 2), [1000, 200]);
});

function validAuditFixture() {
  const lens = fixture();
  lens.verification.unresolvedFields = AUDITED_FIELDS.filter((field) => field !== 'mount');
  const entry = { id: lens.id, ...structuredClone(lens.verification), confirmedValues: { mount: 'L-Mount' }, corrections: {}, sources: [{ url: 'https://example.com/spec', excerpt: 'L-Mount' }] };
  return { lenses: [lens], report: { checkedAt: '2026-10-21', entries: [entry] } };
}

test('coverage validator rejects omitted entries, conflicting states and unapplied corrections', () => {
  let f = validAuditFixture();
  assert.deepEqual(validateAudit(f.lenses, f.report), { reviewed: 1, confirmedMount: 1 });
  f.report.entries = [];
  assert.throws(() => validateAudit(f.lenses, f.report), /Every stored lens/);
  f = validAuditFixture();
  f.lenses[0].verification.verifiedFields.push('weightGram');
  f.report.entries[0].verifiedFields.push('weightGram');
  assert.throws(() => validateAudit(f.lenses, f.report), /exactly one evidence state/);
  f = validAuditFixture();
  f.report.entries[0].corrections.weightGram = 123;
  assert.throws(() => validateAudit(f.lenses, f.report), /unapplied correction/);
  f = validAuditFixture();
  f.lenses[0].mount = 'Another mount';
  assert.throws(() => validateAudit(f.lenses, f.report), /changed without an updated evidence record/);
});
