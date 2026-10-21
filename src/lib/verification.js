// A numeric value in the catalog is not evidence. Only fields explicitly
// supported by the per-lens audit may be presented as confirmed specifications.
export function isFieldVerified(lens, field) {
  const audit = lens.verification;
  if (!audit) return false;
  if (field === 'mount') return audit.mountConfirmed === true;
  return audit.verifiedFields.includes(field) && !audit.unresolvedFields.includes(field);
}

export function verifiedAttribute(lens, field) {
  return isFieldVerified(lens, field) ? lens[field] : undefined;
}

// Unknown values stay at the end for either sort direction, never as zero.
export function compareKnownValues(a, b, descending = false) {
  const unknownA = a === undefined || a === null || (typeof a === 'number' && !Number.isFinite(a));
  const unknownB = b === undefined || b === null || (typeof b === 'number' && !Number.isFinite(b));
  if (unknownA || unknownB) return Number(unknownA) - Number(unknownB);
  if (a < b) return descending ? 1 : -1;
  if (a > b) return descending ? -1 : 1;
  return 0;
}
