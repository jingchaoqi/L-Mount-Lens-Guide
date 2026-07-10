// Client-side EN/ZH language toggle. Runs on every page (wired in Layout.astro).
// Swaps the textContent of every [data-i18n] element using the shared
// dictionary, persists the choice in localStorage, and exposes
// window.__i18n so other page scripts (e.g. filter.js) can translate
// strings they generate dynamically (like "Showing X of Y").
//
// Elements marked [data-i18n-html] are updated via innerHTML instead of
// textContent, so a translation can contain inline tags (<strong>, <code>).
// The dictionary is authored by project maintainers, not user input, so
// this is safe — never wire user-supplied text through data-i18n-html.

import { dict } from '../lib/i18n-dict.js';

const STORAGE_KEY = 'lmount-lang';

function detectInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'zh') return saved;
  } catch {
    // localStorage unavailable (e.g. privacy mode) — fall through to detection.
  }
  return navigator.language && navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

let currentLang = detectInitialLang();

function interpolate(template, vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

function t(key, vars) {
  const template = (dict[currentLang] && dict[currentLang][key]) ?? dict.en[key] ?? key;
  return interpolate(template, vars);
}

function applyToDom() {
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    let vars;
    const varsAttr = el.getAttribute('data-i18n-vars');
    if (varsAttr) {
      try {
        vars = JSON.parse(varsAttr);
      } catch {
        vars = undefined;
      }
    }
    const value = t(key, vars);
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });

  // <optgroup> only renders its `label` attribute, not child text nodes.
  document.querySelectorAll('[data-i18n-label]').forEach((el) => {
    el.setAttribute('label', t(el.getAttribute('data-i18n-label')));
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria-label')));
  });

  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    btn.textContent = currentLang === 'zh' ? 'EN' : '中文';
    btn.setAttribute('aria-pressed', String(currentLang === 'zh'));
  });

  // Per-lens free-text content (e.g. notes) that ships as parallel EN/ZH
  // elements rather than a dictionary key — show only the current language.
  document.querySelectorAll('[data-lang-content]').forEach((el) => {
    el.hidden = el.getAttribute('data-lang-content') !== currentLang;
  });

  document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: currentLang } }));

  // Reveal the page (see the anti-flash <style> in Layout.astro) now that
  // the correct language has been applied. Idempotent — cheap to set again
  // on every later toggle.
  document.documentElement.setAttribute('data-i18n-ready', '');
}

function setLang(lang) {
  if (lang !== 'en' && lang !== 'zh') return;
  currentLang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore write failures
  }
  applyToDom();
}

window.__i18n = {
  get lang() {
    return currentLang;
  },
  t,
  setLang,
};

function init() {
  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(currentLang === 'zh' ? 'en' : 'zh');
    });
  });
  applyToDom();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
