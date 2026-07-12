export type LensFormat = 'Full Frame' | 'APS-C';
export type LensType = 'Prime' | 'Zoom';
export type FocusType = 'AF' | 'MF';

export type LensCategory =
  | 'Wide Angle'
  | 'Standard'
  | 'Portrait'
  | 'Telephoto'
  | 'Macro'
  | 'Cine';

/**
 * Free text keyed by locale code (see src/lib/locales.js). The default
 * locale ('en') is required; other locales are optional and fall back to it.
 */
export type LocalizedText = { en: string } & Partial<Record<string, string>>;

export interface RetailerSearchUrl {
  /** Display label, e.g. "B&H", "Amazon" */
  label: string;
  url: string;
  /**
   * Reserved for future monetization. Not used yet — all links in this
   * project are currently plain, non-monetized search links. Any future
   * affiliate/sponsored link MUST set this to true and the UI MUST render
   * a visible "sponsored"/"affiliate" label next to it.
   */
  sponsored?: boolean;
}

export interface Lens {
  /** Unique slug, used as the URL path segment: /lenses/{id} */
  id: string;
  brand: string;
  model: string;
  mount: 'L-Mount';
  /** True only if the brand is a listed member of the L-Mount Alliance. */
  allianceMember: boolean;
  format: LensFormat;
  lensType: LensType;
  focusType: FocusType;
  /** For primes, focalLengthMin === focalLengthMax. */
  focalLengthMin: number;
  focalLengthMax: number;
  /** Widest (smallest number) aperture, e.g. 1.4 */
  maxAperture: number;
  /** Narrowest (largest number) aperture, e.g. 16 */
  minAperture: number;
  weightGram: number;
  filterThreadMm: number | null;
  minFocusDistanceM: number;
  maxMagnification: number;
  stabilization: boolean;
  weatherSealed: boolean | null;
  category: LensCategory[];
  releaseYear: number;
  officialUrl: string;
  /** Citations for the specs above. At least one required. */
  sourceUrls: string[];
  /** Short factual summary, keyed by locale. `en` required; others optional. */
  notes: LocalizedText;
  /** Reserved for future commercial links. Empty for now. */
  affiliateUrls: RetailerSearchUrl[];
  /** Non-monetized "search this lens at a retailer" links. */
  retailerSearchUrls: RetailerSearchUrl[];
}
