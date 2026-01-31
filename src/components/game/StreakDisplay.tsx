'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { STREAK_MILESTONES } from '@/lib/constants';

interface StreakDisplayProps {
  streak: number;
  bestStreak: number;
}

export default function StreakDisplay({ streak, bestStreak }: StreakDisplayProps) {
  const t = useTranslations();
  const [showMilestone, setShowMilestone] = useState(false);

  useEffect(() => {
    if (STREAK_MILESTONES.includes(streak as typeof STREAK_MILESTONES[number])) {
      setShowMilestone(true);
      const timer = setTimeout(() => setShowMilestone(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [streak]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Current streak */}
      <div className={`flex items-center gap-2 text-2xl font-bold transition-transform ${showMilestone ? 'scale-125' : ''}`}>
        <span className="text-3xl">🔥</span>
        <span className="text-[#FF9F43]">{streak}</span>
      </div>

      {/* Best streak */}
      {bestStreak > 0 && (
        <div className="flex items-center gap-1 text-sm text-[#6B5744]">
          <span>{t('game.bestStreak')}:</span>
          <span className="font-bold">{bestStreak}</span>
        </div>
      )}

      {/* Milestone celebration */}
      {showMilestone && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-[#FFD93D] text-[#4A3728] px-6 py-2 rounded-full font-bold animate-bounce-in shadow-lg">
          {streak} {t('game.streak')}! 🎉
        </div>
      )}
    </div>
  );
}
