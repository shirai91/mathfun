'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLevelContext } from '@/contexts/LevelContext';
import { useSoundContext } from '@/contexts/SoundContext';
import { getLevelConfig } from '@/lib/levelSystem';
import { LEVEL_COLORS } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Confetti from './Confetti';

export default function LevelUpModal() {
  const t = useTranslations();
  const { showLevelUp, newLevelReached, dismissLevelUp } = useLevelContext();
  const { playComplete, playClick } = useSoundContext();
  const [isAnimating, setIsAnimating] = useState(false);

  const levelConfig = getLevelConfig(newLevelReached);
  const levelColor = LEVEL_COLORS[newLevelReached - 1] || LEVEL_COLORS[0];

  useEffect(() => {
    if (showLevelUp) {
      setIsAnimating(true);
      playComplete();
    }
  }, [showLevelUp, playComplete]);

  const handleDismiss = () => {
    playClick();
    setIsAnimating(false);
    setTimeout(() => {
      dismissLevelUp();
    }, 200);
  };

  if (!showLevelUp) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Confetti show={isAnimating} />

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isAnimating ? 1 : 0 }}
      />

      {/* Modal content */}
      <div
        className={`
          relative z-10 flex flex-col items-center gap-6 p-8 mx-4
          bg-[#FFF8E7] rounded-3xl shadow-2xl max-w-sm w-full
          transition-all duration-500 ease-out
          ${isAnimating ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
        `}
      >
        {/* Celebration stars */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>⭐</span>
          <span className="text-5xl animate-bounce" style={{ animationDelay: '0.1s' }}>🌟</span>
          <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
        </div>

        {/* Level Up text */}
        <h2 className="text-3xl font-black text-[#4A3728] animate-pulse">
          {t('level.levelUp')}
        </h2>

        {/* Level badge */}
        <div
          className="flex items-center justify-center w-28 h-28 rounded-full font-black text-white text-5xl shadow-xl animate-spin-slow"
          style={{ backgroundColor: levelColor }}
        >
          {newLevelReached}
        </div>

        {/* New title */}
        <div className="text-center">
          <p className="text-lg text-[#6B5744]">{t('level.newTitle')}</p>
          <h3
            className="text-2xl font-black mt-1"
            style={{ color: levelColor }}
          >
            {t(levelConfig.titleKey)}
          </h3>
        </div>

        {/* Encouragement message */}
        <p className="text-center text-[#6B5744]">
          {t('level.congratulations')}
        </p>

        {/* Continue button */}
        <Button variant="green" size="lg" onClick={handleDismiss}>
          {t('level.continue')}
        </Button>
      </div>
    </div>
  );
}
