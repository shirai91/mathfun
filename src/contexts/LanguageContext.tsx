'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, getStoredLocale, setStoredLocale } from '@/i18n/client';

export type { Locale } from '@/i18n/client';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('vi');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredLocale();
    if (stored) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);
    // Reload the page to apply the new locale with next-intl
    window.location.reload();
  };

  // Prevent hydration mismatch by using default locale until mounted
  const currentLocale = mounted ? locale : 'vi';

  return (
    <LanguageContext.Provider value={{
      locale: currentLocale,
      setLocale
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
