'use client';

import { useTranslations } from 'next-intl';

interface ScoreBoardProps {
  current: number;
  total: number;
  score?: number;
}

export default function ScoreBoard({ current, total, score }: ScoreBoardProps) {
  const t = useTranslations();
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-md">
      {/* Progress text */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold text-[#4A3728]">
          {t('game.questionOf', { current, total })}
        </span>
        {score !== undefined && (
          <span className="text-lg font-bold text-[#7CB342]">
            {t('game.score')}: {score}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full h-4 bg-[#F5EDD8] rounded-full overflow-hidden shadow-inner">
        <div
          className="progress-bar h-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question dots */}
      <div className="flex justify-center gap-2 mt-3">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`
              w-3 h-3 rounded-full transition-all
              ${i < current - 1 ? 'bg-[#7CB342]' : i === current - 1 ? 'bg-[#FFD93D] scale-125' : 'bg-[#F5EDD8]'}
            `}
          />
        ))}
      </div>
    </div>
  );
}
