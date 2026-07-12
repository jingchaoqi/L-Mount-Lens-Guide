// The single source of truth for which languages this site ships.
//
// Everything language-shaped derives from this list — the set of static
// routes that get generated, the `<html lang>` value, the hreflang
// alternates, the language switcher, the first-visit language redirect,
// and the data validator's rules for per-lens localized text. Adding a
// language should mean editing this file, adding a section to
// i18n-dict.js, and (optionally) adding notes translations to
// lenses.json — nothing else.
//
// Plain .js rather than .ts on purpose: it has to be importable from
// three places that can't share a TypeScript build — Astro frontmatter,
// a raw browser script, and the pure-Node data validator.

/**
 * @typedef {object} Locale
 * @property {string} code          URL prefix + dictionary key, e.g. 'zh'.
 *                                  The default locale's pages are served
 *                                  unprefixed; every other locale lives
 *                                  under /<code>/.
 * @property {string} htmlLang      Value for <html lang>, e.g. 'zh-CN'.
 * @property {string} label         The language's own name for itself, used
 *                                  as the language switcher's link text (a
 *                                  visitor who can't read the current page
 *                                  must still be able to read this).
 * @property {string[]} matchPrefixes
 *                                  BCP-47 primary subtags that should resolve
 *                                  to this locale when matching against the
 *                                  visitor's navigator.languages. Matching is
 *                                  case-insensitive and treats 'zh' as also
 *                                  matching 'zh-CN', 'zh-Hant', etc.
 */

/** @type {Locale[]} */
export const LOCALES = [
  { code: 'en', htmlLang: 'en', label: 'EN', matchPrefixes: ['en'] },
  { code: 'zh', htmlLang: 'zh-CN', label: '中文', matchPrefixes: ['zh'] },
];

/**
 * The locale served at the un-prefixed URLs (/, /about, /lenses/<id>) and
 * the fallback for any visitor whose language we don't ship. Also the one
 * locale whose per-lens `notes` translation is mandatory — everything else
 * falls back to it.
 */
export const DEFAULT_LOCALE = 'en';

/** @type {string[]} */
export const LOCALE_CODES = LOCALES.map((locale) => locale.code);

/** localStorage key holding the visitor's explicit language choice, if any. */
export const LANG_STORAGE_KEY = 'lmount-lang';

/** @param {unknown} code */
export function isLocale(code) {
  return typeof code === 'string' && LOCALE_CODES.includes(code);
}

/**
 * @param {unknown} code
 * @returns {Locale} the named locale, or the default locale if unknown.
 */
export function getLocale(code) {
  return (
    LOCALES.find((locale) => locale.code === code)
    ?? /** @type {Locale} */ (LOCALES.find((locale) => locale.code === DEFAULT_LOCALE))
  );
}

/**
 * Resolve a list of BCP-47 language tags (i.e. navigator.languages) to one
 * of our locale codes, or null if none of them match anything we ship.
 * Shared by the in-page redirect script so the negotiation rule lives in
 * exactly one place.
 *
 * @param {readonly string[]} tags
 * @returns {string | null}
 */
export function matchLocale(tags) {
  for (const tag of tags) {
    const normalized = String(tag || '').toLowerCase();
    for (const locale of LOCALES) {
      for (const prefix of locale.matchPrefixes) {
        if (normalized === prefix || normalized.startsWith(`${prefix}-`)) {
          return locale.code;
        }
      }
    }
  }
  return null;
}
