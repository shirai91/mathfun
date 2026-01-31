'use client';

import { useLanguage, Locale } from '@/contexts/LanguageContext';

const locales: Locale[] = ['vi', 'en'];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex gap-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          className={`
            px-3 py-1.5 rounded-full text-sm font-semibold transition-all
            ${loc === locale
              ? 'bg-[#4ECDC4] text-white shadow-md'
              : 'bg-[#F5EDD8] text-[#6B5744] hover:bg-[#E8DCC6]'
            }
          `}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
