import rawLenses from '../data/lenses.json';
import type { Lens } from './types';
import { t, brandName, localized, LOCALE_CODES, type Lang } from './i18n';
import { isFieldVerified } from './verification.js';
export { isFieldVerified, verifiedAttribute } from './verification.js';

export const lenses = rawLenses as unknown as Lens[];

export function getAllLenses(): Lens[] {
  return lenses;
}

/** Historical detail routes stay available; the directory requires evidence of an L version. */
export function getPublishedLenses(): Lens[] {
  return lenses.filter((lens) => lens.verification?.mountConfirmed === true);
}

export function getLensById(id: string): Lens | undefined {
  return lenses.find((lens) => lens.id === id);
}

/** Alliance-member brands first (A-Z), then third-party brands (A-Z). */
export function getBrandsGrouped(): { alliance: string[]; thirdParty: string[]; unconfirmed: string[] } {
  const allianceBrands = new Set<string>();
  const thirdPartyBrands = new Set<string>();
  const unconfirmedBrands = new Set<string>();
  for (const lens of getPublishedLenses()) {
    (!isFieldVerified(lens, 'allianceMember') ? unconfirmedBrands : lens.allianceMember ? allianceBrands : thirdPartyBrands).add(lens.brand);
  }
  const sortAsc = (a: string, b: string) => a.localeCompare(b);
  return {
    alliance: Array.from(allianceBrands).sort(sortAsc),
    thirdParty: Array.from(thirdPartyBrands).sort(sortAsc),
    unconfirmed: Array.from(unconfirmedBrands).sort(sortAsc),
  };
}

/** Human-readable focal length label, e.g. "35mm" or "24-70mm" */
export function focalLengthLabel(lens: Lens, lang: Lang = 'en'): string {
  if (!isFieldVerified(lens, 'focalLengthMin') || !isFieldVerified(lens, 'focalLengthMax')) return t(lang, 'spec.unconfirmed');
  return lens.focalLengthMin === lens.focalLengthMax
    ? `${lens.focalLengthMin}mm`
    : `${lens.focalLengthMin}-${lens.focalLengthMax}mm`;
}

/** Human-readable aperture label, e.g. "f/1.4" or "f/2.8-4" */
export function apertureLabel(lens: Lens, lang: Lang = 'en'): string {
  if (!isFieldVerified(lens, 'maxAperture')) return t(lang, 'spec.unconfirmed');
  return isFieldVerified(lens, 'maxApertureTele') && lens.maxApertureTele !== lens.maxAperture
    ? `f/${lens.maxAperture}-${lens.maxApertureTele}` : `f/${lens.maxAperture}`;
}

export function weightLabel(lens: Lens, lang: Lang = 'en'): string {
  if (!isFieldVerified(lens, 'weightGram')) return t(lang, 'spec.unconfirmed');
  return lens.weightGram >= 1000
    ? `${(lens.weightGram / 1000).toFixed(2)}kg`
    : `${lens.weightGram}g`;
}

/** Shared by detail, cards, SEO and comparison so unknowns cannot become yes/no or zero. */
export function specLabel(lens: Lens, field: string, lang: Lang): string {
  if (!isFieldVerified(lens, field)) return t(lang, 'spec.unconfirmed');
  switch (field) {
    case 'mount': return lens.mount;
    case 'format': return t(lang, lens.format === 'Full Frame' ? 'filterBar.fullFrame' : 'filterBar.apsc');
    case 'lensType': return t(lang, lens.lensType === 'Prime' ? 'filterBar.prime' : 'filterBar.zoom');
    case 'focusType': return t(lang, lens.focusType === 'AF' ? 'detail.af' : 'detail.mf');
    case 'focalLengthMin': return focalLengthLabel(lens, lang);
    case 'maxAperture': return apertureLabel(lens, lang);
    case 'minAperture': return isFieldVerified(lens, 'minApertureWide') && lens.minApertureWide !== lens.minAperture
      ? `f/${lens.minApertureWide}-${lens.minAperture}` : `f/${lens.minAperture}`;
    case 'weightGram': return weightLabel(lens, lang);
    case 'filterThreadMm': return lens.filterThreadMm === null ? t(lang, 'spec.filterThreadNone') : `${lens.filterThreadMm}mm`;
    case 'minFocusDistanceM': return `${lens.minFocusDistanceM}m`;
    case 'maxMagnification': return `${lens.maxMagnification}×`;
    case 'stabilization': return t(lang, lens.stabilization ? 'spec.yes' : 'spec.no');
    case 'weatherSealed': return lens.weatherSealed === null ? t(lang, 'spec.notSpecified') : t(lang, lens.weatherSealed ? 'spec.yes' : 'spec.no');
    case 'releaseYear': return String(lens.releaseYear);
    case 'allianceMember': return t(lang, lens.allianceMember ? 'spec.yes' : 'spec.noThirdParty');
    default: return t(lang, 'spec.unconfirmed');
  }
}

export function auditFieldLabel(field: string, lang: Lang): string {
  const labels: Record<string, string> = {
    model: 'audit.model', notes: 'audit.notes', mount: 'spec.mount',
    format: 'spec.format', lensType: 'spec.lensType', focusType: 'spec.focusType',
    focalLengthMin: 'spec.focalLength', focalLengthMax: 'spec.focalLength',
    maxAperture: 'spec.maxAperture', maxApertureTele: 'spec.maxAperture',
    minAperture: 'spec.minAperture', minApertureWide: 'spec.minAperture',
    weightGram: 'spec.weight', filterThreadMm: 'spec.filterThread',
    minFocusDistanceM: 'spec.minFocusDistance', maxMagnification: 'spec.maxMagnification',
    stabilization: 'spec.stabilization', weatherSealed: 'spec.weatherSealed',
    releaseYear: 'spec.releaseYear', allianceMember: 'spec.allianceMember',
  };
  return t(lang, labels[field] ?? 'spec.unconfirmed');
}

export const WEIGHT_BUCKETS: { id: string; label: string; min: number; max: number }[] = [
  { id: 'lt300', label: '< 300g', min: 0, max: 300 },
  { id: '300-600', label: '300 - 600g', min: 300, max: 600 },
  { id: '600-1000', label: '600 - 1000g', min: 600, max: 1000 },
  { id: '1000-1500', label: '1000 - 1500g', min: 1000, max: 1500 },
  { id: 'gt1500', label: '> 1500g', min: 1500, max: Infinity },
];

export function weightBucketId(weightGram: number): string {
  const bucket = WEIGHT_BUCKETS.find((b) => weightGram >= b.min && weightGram < b.max)
    ?? WEIGHT_BUCKETS[WEIGHT_BUCKETS.length - 1];
  return bucket.id;
}

/** Focal length range across the whole catalog, used to bound the focal-length slider. */
export function getFocalRange(): { min: number; max: number } {
  const confirmed = getPublishedLenses().filter((lens) => isFieldVerified(lens, 'focalLengthMin') && isFieldVerified(lens, 'focalLengthMax'));
  return {
    min: Math.min(...confirmed.map((l) => l.focalLengthMin)),
    max: Math.max(...confirmed.map((l) => l.focalLengthMax)),
  };
}

/**
 * Focal lengths conventionally treated as "standard" prime steps in photography
 * (ultra-wide through super-tele), used as quick-pick tick marks on the
 * focal-length slider. Source: Wikipedia's "Prime lens" focal length list,
 * cross-checked against common L-Mount prime releases.
 */
export const COMMON_FOCAL_LENGTHS = [14, 20, 24, 35, 50, 85, 105, 135, 200, 300, 400, 600];

/** Builds the SEO title/description for a lens detail page, in `lang`. */
export function lensSeo(lens: Lens, lang: Lang): { title: string; description: string } {
  const brand = brandName(lang, lens.brand);
  return {
    title: t(lang, 'seo.lensTitle', { brand, model: lens.model }),
    description: t(lang, 'seo.lensDescription', {
      brand,
      model: lens.model,
      focal: focalLengthLabel(lens, lang),
      aperture: apertureLabel(lens, lang),
      format: specLabel(lens, 'format', lang),
      focus: specLabel(lens, 'focusType', lang),
      weight: weightLabel(lens, lang),
      alliance: specLabel(lens, 'allianceMember', lang),
    }),
  };
}

/** The lens's notes in `lang`, falling back to the default locale. */
export function lensNotes(lens: Lens, lang: Lang): string {
  return isFieldVerified(lens, 'notes') ? localized(lens.notes, lang) : t(lang, 'audit.notesPending');
}

/**
 * The haystack `filter.js` matches the search box against, built once here
 * so the card view and the table view cannot drift apart on what is
 * searchable (they render separately but must filter identically).
 *
 * Brand names for *every* locale are included, not just the current one, so
 * searching "Sigma" still works on the Chinese pages and "适马" still works
 * on the English ones — the visitor's keyboard and the page's language are
 * not the same thing.
 */
export function lensSearchText(lens: Lens): string {
  const brandAliases = LOCALE_CODES.map((code) => brandName(code, lens.brand));
  return [...new Set([...brandAliases, lens.model, focalLengthLabel(lens)])]
    .join(' ')
    .toLowerCase();
}
