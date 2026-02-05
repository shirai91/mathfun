'use client';

import { useTranslations } from 'next-intl';
import { useLevelContext } from '@/contexts/LevelContext';

interface LevelDisplayProps {
  compact?: boolean;
  showXP?: boolean;
}

export default function LevelDisplay({ compact = false, showXP = true }: LevelDisplayProps) {
  const t = useTranslations();
  const { levelData, levelConfig, levelProgress, xpUntilNextLevel, levelColor, isMaxLevel } = useLevelContext();

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full font-black text-white text-lg shadow-md"
          style={{ backgroundColor: levelColor }}
        >
          {levelData.level}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[#4A3728]">
            {t(levelConfig.titleKey)}
          </span>
          {showXP && !isMaxLevel && (
            <div className="w-16 h-1.5 bg-[#E8DCC8] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%`, backgroundColor: levelColor }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white/50 rounded-2xl shadow-md">
      {/* Level badge */}
      <div className="relative">
        <div
          className="flex items-center justify-center w-20 h-20 rounded-full font-black text-white text-4xl shadow-lg animate-pulse-slow"
          style={{ backgroundColor: levelColor }}
        >
          {levelData.level}
        </div>
        {isMaxLevel && (
          <div className="absolute -top-1 -right-1 text-2xl animate-bounce">
            ⭐
          </div>
        )}
      </div>

      {/* Title */}
      <div className="text-center">
        <h3 className="text-xl font-black text-[#4A3728]">
          {t(levelConfig.titleKey)}
        </h3>
        <p className="text-sm text-[#6B5744]">
          {t('level.level')} {levelData.level}
        </p>
      </div>

      {/* Progress bar */}
      {showXP && (
        <div className="w-full">
          <div className="w-full h-3 bg-[#E8DCC8] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${levelProgress}%`, backgroundColor: levelColor }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-[#6B5744]">
              {levelData.totalXP} XP
            </span>
            {!isMaxLevel && (
              <span className="text-xs text-[#6B5744]">
                {xpUntilNextLevel} {t('level.xpToNext')}
              </span>
            )}
            {isMaxLevel && (
              <span className="text-xs text-[#6B5744] font-bold">
                {t('level.maxLevel')}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
