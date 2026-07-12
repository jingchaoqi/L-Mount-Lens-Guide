// Build-time i18n helpers.
//
// Every page on this site is server-rendered once per locale (see the
// [...locale] routes under src/pages/), so translation happens here, at
// build time, and the browser receives HTML that is already in the right
// language. There is deliberately no runtime DOM-translation pass — that
// is what used to make a wrong-language flash possible at all.
//
// The set of locales lives in ./locales.js; the strings live in
// ./i18n-dict.js. This module just joins them and turns them into URLs.

import { dict } from './i18n-dict.js';
import {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_CODES,
  LANG_STORAGE_KEY,
  isLocale,
  getLocale,
  matchLocale,
} from './locales.js';

export { LOCALES, DEFAULT_LOCALE, LOCALE_CODES, LANG_STORAGE_KEY, isLocale, getLocale, matchLocale };

/** A locale code, e.g. 'en' | 'zh'. Kept as a plain string because the
 *  registry (locales.js) is the runtime source of truth, not the type. */
export type Lang = string;

/** Free text keyed by locale code, as stored per-lens in lenses.json. */
export type LocalizedText = { en: string } & Partial<Record<string, string>>;

type Dict = Record<string, Record<string, string>>;

const strings = dict as unknown as Dict;

/**
 * The page path a route occupies, with no base and no locale prefix:
 * '' for the home page, 'about', 'compare', 'lenses/<id>'. Layouts and
 * components take this so they can link to the same page in another
 * language without having to parse it back out of the URL.
 */
export type PagePath = string;

const BASE = import.meta.env.BASE_URL; // Always ends with '/'.

function interpolate(template: string, vars?: Record<string, unknown>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

/**
 * Translate `key` into `lang`, falling back to the default locale and then
 * to the key itself, so a missing translation degrades to readable English
 * rather than a blank page.
 */
export function t(lang: Lang, key: string, vars?: Record<string, unknown>): string {
  const template = strings[lang]?.[key] ?? strings[DEFAULT_LOCALE]?.[key] ?? key;
  return interpolate(template, vars);
}

/** The brand name as displayed in `lang` (brands have their own dict keys). */
export function brandName(lang: Lang, brand: string): string {
  return t(lang, `brand.${brand}`);
}

/** Pick the best available translation out of a per-locale text map. */
export function localized(text: LocalizedText, lang: Lang): string {
  return text[lang] ?? text[DEFAULT_LOCALE];
}

/**
 * Href for `path` in `lang`, base-path aware. The default locale is served
 * un-prefixed (so existing English URLs keep working); every other locale
 * is served under /<code>/.
 */
export function localeHref(lang: Lang, path: PagePath = ''): string {
  const prefix = lang === DEFAULT_LOCALE ? '' : `${lang}/`;
  return `${BASE}${prefix}${path}`;
}

/** Every locale's href for the same page — used for hreflang + the switcher. */
export function localeAlternates(path: PagePath = ''): { lang: Lang; htmlLang: string; label: string; href: string }[] {
  return LOCALES.map((locale) => ({
    lang: locale.code,
    htmlLang: locale.htmlLang,
    label: locale.label,
    href: localeHref(locale.code, path),
  }));
}

/**
 * getStaticPaths() entries for the [...locale] rest parameter: `undefined`
 * for the default locale (which collapses to the un-prefixed route) and the
 * code itself for every other locale. Adding a locale to locales.js
 * therefore adds a full set of pages with no routing changes.
 */
export function localeStaticPaths(): { params: { locale: string | undefined } }[] {
  return LOCALES.map((locale) => ({
    params: { locale: locale.code === DEFAULT_LOCALE ? undefined : locale.code },
  }));
}

/** Resolve the [...locale] route param back into a locale code. */
export function langFromParam(param: string | undefined): Lang {
  return isLocale(param) ? (param as string) : DEFAULT_LOCALE;
}
