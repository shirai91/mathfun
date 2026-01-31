'use client';

import { ReactNode, useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getStoredLocale, Locale } from '@/i18n/client';

// Import messages statically to avoid dynamic import issues in client
import viMessages from '../../../messages/vi.json';
import enMessages from '../../../messages/en.json';

const messages: Record<Locale, typeof viMessages> = {
  vi: viMessages,
  en: enMessages,
};

interface IntlProviderProps {
  children: ReactNode;
}

export default function IntlProvider({ children }: IntlProviderProps) {
  const [locale, setLocale] = useState<Locale>('vi');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredLocale();
    if (stored && stored !== 'vi') {
      setLocale(stored);
    }
  }, []);

  // Use default locale until client is mounted to prevent hydration mismatch
  const currentLocale = mounted ? locale : 'vi';

  return (
    <NextIntlClientProvider locale={currentLocale} messages={messages[currentLocale]}>
      {children}
    </NextIntlClientProvider>
  );
}
