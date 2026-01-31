'use client';

import { useTranslations } from 'next-intl';

interface StarRatingProps {
  score: number;
  total: number;
}

function Star({ filled, index }: { filled: boolean; index: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? '#FFD93D' : '#F5EDD8'}
      className={`w-16 h-16 md:w-20 md:h-20 ${filled ? 'animate-star' : ''}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function StarRating({ score, total }: StarRatingProps) {
  const t = useTranslations();
  const percentage = (score / total) * 100;

  let stars = 0;
  if (percentage >= 100) stars = 3;
  else if (percentage >= 70) stars = 2;
  else if (percentage >= 40) stars = 1;

  const getMessage = () => {
    if (stars === 3) return t('starRating.perfect');
    if (stars === 2) return t('starRating.great');
    if (stars === 1) return t('starRating.good');
    return t('starRating.keepPracticing');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Star filled={stars >= 1} index={0} />
        <Star filled={stars >= 2} index={1} />
        <Star filled={stars >= 3} index={2} />
      </div>
      <p className="text-2xl font-bold text-[#4A3728] text-center">
        {getMessage()}
      </p>
    </div>
  );
}
