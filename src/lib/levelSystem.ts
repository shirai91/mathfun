import { LevelData, LevelConfig } from '@/types';
import { LEVEL_CONFIGS, MAX_LEVEL, XP_REWARDS, STREAK_MILESTONES } from './constants';

const STORAGE_KEY = 'mathfun-level-data';

/**
 * Get the default level data for a new player
 */
export function getDefaultLevelData(): LevelData {
  return {
    level: 1,
    currentXP: 0,
    totalXP: 0,
  };
}

/**
 * Load level data from localStorage
 */
export function loadLevelData(): LevelData {
  if (typeof window === 'undefined') {
    return getDefaultLevelData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as LevelData;
      // Validate the data structure
      if (
        typeof data.level === 'number' &&
        typeof data.currentXP === 'number' &&
        typeof data.totalXP === 'number'
      ) {
        return data;
      }
    }
  } catch {
    // Invalid data, return default
  }

  return getDefaultLevelData();
}

/**
 * Save level data to localStorage
 */
export function saveLevelData(data: LevelData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage might be full or disabled
  }
}

/**
 * Get the level configuration for a specific level
 */
export function getLevelConfig(level: number): LevelConfig {
  const clampedLevel = Math.min(Math.max(level, 1), MAX_LEVEL);
  return LEVEL_CONFIGS[clampedLevel - 1];
}

/**
 * Get the XP required for the next level
 */
export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel >= MAX_LEVEL) {
    return 0; // Max level reached
  }
  return LEVEL_CONFIGS[currentLevel].xpRequired;
}

/**
 * Get the XP required for the current level (starting point)
 */
export function getXPForCurrentLevel(currentLevel: number): number {
  return LEVEL_CONFIGS[currentLevel - 1].xpRequired;
}

/**
 * Calculate the progress percentage towards the next level
 */
export function getLevelProgress(data: LevelData): number {
  if (data.level >= MAX_LEVEL) {
    return 100; // Max level
  }

  const currentLevelXP = getXPForCurrentLevel(data.level);
  const nextLevelXP = getXPForNextLevel(data.level);
  const xpInCurrentLevel = data.totalXP - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelXP;

  return Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100));
}

/**
 * Calculate XP to award for a correct answer
 */
export function calculateCorrectAnswerXP(): number {
  return XP_REWARDS.correctAnswer;
}

/**
 * Calculate bonus XP for reaching a streak milestone
 */
export function calculateStreakBonusXP(streak: number): number {
  if (STREAK_MILESTONES.includes(streak as typeof STREAK_MILESTONES[number])) {
    return XP_REWARDS.streakBonus[streak as keyof typeof XP_REWARDS.streakBonus] || 0;
  }
  return 0;
}

/**
 * Calculate bonus XP for completing quick-start mode
 */
export function calculateCompletionBonusXP(score: number, total: number): number {
  let bonus = XP_REWARDS.completionBonus;

  // Perfect game bonus
  if (score === total) {
    bonus += XP_REWARDS.perfectGame;
  }

  return bonus;
}

/**
 * Add XP and handle level ups
 * Returns the new level data and whether a level up occurred
 */
export function addXP(
  currentData: LevelData,
  xpAmount: number
): { newData: LevelData; leveledUp: boolean; newLevel: number } {
  const newTotalXP = currentData.totalXP + xpAmount;
  let newLevel = currentData.level;
  let leveledUp = false;

  // Check for level ups
  while (newLevel < MAX_LEVEL) {
    const nextLevelXP = getXPForNextLevel(newLevel);
    if (newTotalXP >= nextLevelXP) {
      newLevel++;
      leveledUp = true;
    } else {
      break;
    }
  }

  const newData: LevelData = {
    level: newLevel,
    currentXP: currentData.currentXP + xpAmount,
    totalXP: newTotalXP,
  };

  return { newData, leveledUp, newLevel };
}

/**
 * Get XP remaining until next level
 */
export function getXPUntilNextLevel(data: LevelData): number {
  if (data.level >= MAX_LEVEL) {
    return 0;
  }

  const nextLevelXP = getXPForNextLevel(data.level);
  return nextLevelXP - data.totalXP;
}

/**
 * Reset level data (for testing or user request)
 */
export function resetLevelData(): LevelData {
  const defaultData = getDefaultLevelData();
  saveLevelData(defaultData);
  return defaultData;
}
