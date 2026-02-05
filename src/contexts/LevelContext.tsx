'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { LevelData, LevelConfig } from '@/types';
import {
  loadLevelData,
  saveLevelData,
  addXP,
  getLevelConfig,
  getLevelProgress,
  getXPUntilNextLevel,
  calculateCorrectAnswerXP,
  calculateStreakBonusXP,
  calculateCompletionBonusXP,
  getDefaultLevelData,
} from '@/lib/levelSystem';
import { MAX_LEVEL, LEVEL_COLORS } from '@/lib/constants';

interface LevelContextType {
  // Current state
  levelData: LevelData;
  levelConfig: LevelConfig;
  levelProgress: number;
  xpUntilNextLevel: number;
  levelColor: string;
  isMaxLevel: boolean;

  // XP earning functions
  awardCorrectAnswer: () => number;
  awardStreakBonus: (streak: number) => number;
  awardCompletionBonus: (score: number, total: number) => number;

  // Level up state
  showLevelUp: boolean;
  newLevelReached: number;
  dismissLevelUp: () => void;

  // Pending XP (for animations)
  pendingXP: number;
  clearPendingXP: () => void;
}

const LevelContext = createContext<LevelContextType | null>(null);

export function LevelProvider({ children }: { children: ReactNode }) {
  const [levelData, setLevelData] = useState<LevelData>(getDefaultLevelData());
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevelReached, setNewLevelReached] = useState(1);
  const [pendingXP, setPendingXP] = useState(0);

  // Load level data from localStorage on mount
  useEffect(() => {
    const data = loadLevelData();
    setLevelData(data);
    setIsLoaded(true);
  }, []);

  // Save level data whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveLevelData(levelData);
    }
  }, [levelData, isLoaded]);

  const levelConfig = getLevelConfig(levelData.level);
  const levelProgress = getLevelProgress(levelData);
  const xpUntilNextLevel = getXPUntilNextLevel(levelData);
  const levelColor = LEVEL_COLORS[levelData.level - 1] || LEVEL_COLORS[0];
  const isMaxLevel = levelData.level >= MAX_LEVEL;

  const handleXPGain = useCallback((xpAmount: number) => {
    const { newData, leveledUp, newLevel } = addXP(levelData, xpAmount);
    setLevelData(newData);
    setPendingXP((prev) => prev + xpAmount);

    if (leveledUp) {
      setNewLevelReached(newLevel);
      setShowLevelUp(true);
    }

    return xpAmount;
  }, [levelData]);

  const awardCorrectAnswer = useCallback(() => {
    const xp = calculateCorrectAnswerXP();
    return handleXPGain(xp);
  }, [handleXPGain]);

  const awardStreakBonus = useCallback((streak: number) => {
    const xp = calculateStreakBonusXP(streak);
    if (xp > 0) {
      return handleXPGain(xp);
    }
    return 0;
  }, [handleXPGain]);

  const awardCompletionBonus = useCallback((score: number, total: number) => {
    const xp = calculateCompletionBonusXP(score, total);
    return handleXPGain(xp);
  }, [handleXPGain]);

  const dismissLevelUp = useCallback(() => {
    setShowLevelUp(false);
  }, []);

  const clearPendingXP = useCallback(() => {
    setPendingXP(0);
  }, []);

  const value: LevelContextType = {
    levelData,
    levelConfig,
    levelProgress,
    xpUntilNextLevel,
    levelColor,
    isMaxLevel,
    awardCorrectAnswer,
    awardStreakBonus,
    awardCompletionBonus,
    showLevelUp,
    newLevelReached,
    dismissLevelUp,
    pendingXP,
    clearPendingXP,
  };

  return (
    <LevelContext.Provider value={value}>
      {children}
    </LevelContext.Provider>
  );
}

export function useLevelContext() {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error('useLevelContext must be used within a LevelProvider');
  }
  return context;
}
