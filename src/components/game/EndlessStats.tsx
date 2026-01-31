'use client';

import { useTranslations } from 'next-intl';

interface EndlessStatsProps {
  totalAnswered: number;
  totalCorrect: number;
  bestStreak: number;
}

export default function EndlessStats({
  totalAnswered,
  totalCorrect,
  bestStreak,
}: EndlessStatsProps) {
  const t = useTranslations();
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="bg-[#FFF8E7] rounded-2xl p-6 shadow-lg border-2 border-[#4A3728]/10">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-4xl font-black text-[#7CB342]">{totalCorrect}</p>
          <p className="text-sm text-[#6B5744]">{t('endless.correctAnswers')}</p>
        </div>

        <div className="text-center">
          <p className="text-4xl font-black text-[#4ECDC4]">{totalAnswered}</p>
          <p className="text-sm text-[#6B5744]">{t('endless.questionsAnswered')}</p>
        </div>

        <div className="text-center">
          <p className="text-4xl font-black text-[#9B59B6]">{accuracy}%</p>
          <p className="text-sm text-[#6B5744]">{t('endless.accuracy')}</p>
        </div>

        <div className="text-center">
          <p className="text-4xl font-black text-[#FF9F43]">{bestStreak}</p>
          <p className="text-sm text-[#6B5744]">{t('game.bestStreak')}</p>
        </div>
      </div>
    </div>
  );
}
