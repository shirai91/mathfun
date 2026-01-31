'use client';

import { useTranslations } from 'next-intl';
import { NumberRange } from '@/types';

interface RangeSelectorProps {
  onSelect: (range: NumberRange) => void;
}

const rangeColors = {
  10: { bg: 'bg-[#7CB342]', hover: 'hover:bg-[#6BA032]' },
  20: { bg: 'bg-[#4ECDC4]', hover: 'hover:bg-[#3DBDB4]' },
  50: { bg: 'bg-[#FF9F43]', hover: 'hover:bg-[#E88E32]' },
  100: { bg: 'bg-[#9B59B6]', hover: 'hover:bg-[#8A48A5]' },
};

export default function RangeSelector({ onSelect }: RangeSelectorProps) {
  const t = useTranslations();
  const ranges: NumberRange[] = [10, 20, 50, 100];

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-[#4A3728] mb-6">
        {t('range.title')}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {ranges.map((range, index) => (
          <button
            key={range}
            onClick={() => onSelect(range)}
            className={`
              btn-bounce
              ${rangeColors[range].bg}
              ${rangeColors[range].hover}
              text-white
              rounded-2xl
              p-6
              shadow-lg
              transition-all
              animate-fade-in
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-5xl font-black mb-2">{range}</div>
            <div className="text-sm font-semibold opacity-90">
              {t(`range.${range}`)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
