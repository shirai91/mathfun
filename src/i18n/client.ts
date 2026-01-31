export type Locale = 'vi' | 'en';

const LOCALE_STORAGE_KEY = 'mathfun-locale';

export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === 'vi' || stored === 'en') {
      return stored;
    }
  } catch {
    // localStorage not available
  }
  return null;
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // localStorage not available
  }
}

export function switchLocale(newLocale: Locale): void {
  setStoredLocale(newLocale);
  // Reload the page to apply the new locale
  window.location.reload();
}
