// Runtime translation for the few strings the browser generates itself.
//
// Almost all text on this site is translated at build time (see src/lib/i18n.ts)
// and arrives as finished HTML. This module exists only for the handful of
// strings that are *generated* in the browser and therefore have no
// server-rendered form to reuse — filter.js's "Showing X of Y" line, and the
// labels compare.js writes onto its buttons as the selection changes.
//
// It is a plain ES module on purpose. The previous version of this handed a
// `t()` out through `window.__i18n` and every caller had to guard with
// `window.__i18n ? ... : <English fallback>` — which meant that whenever a
// caller's script happened to run before i18n.js had, it silently wrote the
// English fallback onto a Chinese page. Importing `t` directly makes the load
// order a module dependency rather than a race, so that cannot happen.

import { dict } from './i18n-dict.js';
import { DEFAULT_LOCALE, isLocale } from './locales.js';

/** The language this page was built in, published on <html data-locale>. */
const pageLocale = document.documentElement.dataset.locale;
export const currentLang = isLocale(pageLocale) ? pageLocale : DEFAULT_LOCALE;

function interpolate(template, vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

/** Translate `key` into the page's language, falling back to English, then the key. */
export function t(key, vars) {
  const template = (dict[currentLang] && dict[currentLang][key]) ?? dict[DEFAULT_LOCALE][key] ?? key;
  return interpolate(template, vars);
}

/** A brand's display name in the page's language. */
export function brandName(brand) {
  return t(`brand.${brand}`);
}
