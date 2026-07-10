import rawLenses from '../data/lenses.json';
import type { Lens } from './types';

export const lenses = rawLenses as unknown as Lens[];

export function getAllLenses(): Lens[] {
  return lenses;
}

export function getLensById(id: string): Lens | undefined {
  return lenses.find((lens) => lens.id === id);
}

/** Alliance-member brands first (A-Z), then third-party brands (A-Z). */
export function getBrandsGrouped(): { alliance: string[]; thirdParty: string[] } {
  const allianceBrands = new Set<string>();
  const thirdPartyBrands = new Set<string>();
  for (const lens of lenses) {
    (lens.allianceMember ? allianceBrands : thirdPartyBrands).add(lens.brand);
  }
  const sortAsc = (a: string, b: string) => a.localeCompare(b);
  return {
    alliance: Array.from(allianceBrands).sort(sortAsc),
    thirdParty: Array.from(thirdPartyBrands).sort(sortAsc),
  };
}

/** Human-readable focal length label, e.g. "35mm" or "24-70mm" */
export function focalLengthLabel(lens: Lens): string {
  return lens.focalLengthMin === lens.focalLengthMax
    ? `${lens.focalLengthMin}mm`
    : `${lens.focalLengthMin}-${lens.focalLengthMax}mm`;
}

/** Human-readable aperture label, e.g. "f/1.4" or "f/2.8-4" */
export function apertureLabel(lens: Lens): string {
  return `f/${lens.maxAperture}`;
}

export function weightLabel(lens: Lens): string {
  return lens.weightGram >= 1000
    ? `${(lens.weightGram / 1000).toFixed(2)}kg`
    : `${lens.weightGram}g`;
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
  return {
    min: Math.min(...lenses.map((l) => l.focalLengthMin)),
    max: Math.max(...lenses.map((l) => l.focalLengthMax)),
  };
}

/**
 * Focal lengths conventionally treated as "standard" prime steps in photography
 * (ultra-wide through super-tele), used as quick-pick tick marks on the
 * focal-length slider. Source: Wikipedia's "Prime lens" focal length list,
 * cross-checked against common L-Mount prime releases.
 */
export const COMMON_FOCAL_LENGTHS = [14, 20, 24, 35, 50, 85, 105, 135, 200, 300, 400, 600];

/** Builds the SEO title/description for a lens detail page. */
export function lensSeo(lens: Lens): { title: string; description: string } {
  const title = `${lens.brand} ${lens.model} — L-Mount Lens Guide`;
  const description = `${lens.brand} ${lens.model}: ${focalLengthLabel(lens)} ${apertureLabel(lens)}, `
    + `${lens.format}, ${lens.focusType === 'AF' ? 'autofocus' : 'manual focus'}, `
    + `${weightLabel(lens)}. ${lens.allianceMember ? 'L-Mount Alliance member.' : 'Third-party L-Mount lens (not an Alliance member).'}`;
  return { title, description };
}
