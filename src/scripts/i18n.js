// Client-side language support.
//
// Deliberately small: this script does NOT translate the page. Every page is
// server-rendered once per language (see the [...locale] routes), so the HTML
// the browser receives is already in the right language — that is what makes a
// wrong-language flash structurally impossible rather than merely well-hidden.
//
// Runtime translation of browser-generated strings lives in
// src/lib/i18n-runtime.js and is imported directly by the scripts that need it
// (filter.js, compare.js) — deliberately not handed around through a global,
// so no caller can run before it is ready and fall back to English.
//
// What is left for this file is the one thing that genuinely needs a listener:
// remembering an explicit language choice, so a visitor who picks a language
// once lands on it directly next time (the redirect in Layout.astro reads the
// same key).

import { LANG_STORAGE_KEY, isLocale } from '../lib/locales.js';
import { currentLang, t } from '../lib/i18n-runtime.js';

// Kept for debugging and for any future script that wants translation without
// importing the module directly. Nothing on the site depends on this existing
// by a particular time — that dependency was the bug it used to cause.
window.__i18n = { lang: currentLang, t };

// The language switcher is a plain link to the same page in another language,
// so it works with no JavaScript at all. This just records the choice, which is
// what lets the redirect in Layout.astro honour it over the browser's own
// language on the next visit to an un-prefixed URL.
document.addEventListener('click', (event) => {
  const link = event.target.closest?.('[data-set-locale]');
  if (!link) return;
  const chosen = link.dataset.setLocale;
  if (!isLocale(chosen)) return;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, chosen);
  } catch {
    // Storage blocked (privacy mode) — the link still navigates, the choice
    // just won't be remembered.
  }
});
