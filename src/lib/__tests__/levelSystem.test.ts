import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getDefaultLevelData,
  getLevelConfig,
  getXPForNextLevel,
  getXPForCurrentLevel,
  getLevelProgress,
  calculateCorrectAnswerXP,
  calculateStreakBonusXP,
  calculateCompletionBonusXP,
  addXP,
  getXPUntilNextLevel,
} from '../levelSystem';
import { LEVEL_CONFIGS, XP_REWARDS, MAX_LEVEL } from '../constants';
import { LevelData } from '@/types';

describe('Level System', () => {
  describe('getDefaultLevelData', () => {
    it('should return default level data with level 1 and 0 XP', () => {
      const data = getDefaultLevelData();
      expect(data).toEqual({
        level: 1,
        currentXP: 0,
        totalXP: 0,
      });
    });
  });

  describe('getLevelConfig', () => {
    it('should return correct config for level 1', () => {
      const config = getLevelConfig(1);
      expect(config.level).toBe(1);
      expect(config.title).toBe('Beginner');
      expect(config.xpRequired).toBe(0);
    });

    it('should return correct config for level 5', () => {
      const config = getLevelConfig(5);
      expect(config.level).toBe(5);
      expect(config.title).toBe('Champion');
      expect(config.xpRequired).toBe(500);
    });

    it('should clamp level to 1 for values below 1', () => {
      const config = getLevelConfig(0);
      expect(config.level).toBe(1);
    });

    it('should clamp level to MAX_LEVEL for values above max', () => {
      const config = getLevelConfig(100);
      expect(config.level).toBe(MAX_LEVEL);
    });
  });

  describe('getXPForNextLevel', () => {
    it('should return XP required for level 2 when at level 1', () => {
      const xp = getXPForNextLevel(1);
      expect(xp).toBe(LEVEL_CONFIGS[1].xpRequired);
      expect(xp).toBe(50);
    });

    it('should return XP required for level 3 when at level 2', () => {
      const xp = getXPForNextLevel(2);
      expect(xp).toBe(LEVEL_CONFIGS[2].xpRequired);
      expect(xp).toBe(150);
    });

    it('should return 0 when at max level', () => {
      const xp = getXPForNextLevel(MAX_LEVEL);
      expect(xp).toBe(0);
    });
  });

  describe('getXPForCurrentLevel', () => {
    it('should return 0 for level 1', () => {
      const xp = getXPForCurrentLevel(1);
      expect(xp).toBe(0);
    });

    it('should return 50 for level 2', () => {
      const xp = getXPForCurrentLevel(2);
      expect(xp).toBe(50);
    });

    it('should return correct XP for level 5', () => {
      const xp = getXPForCurrentLevel(5);
      expect(xp).toBe(500);
    });
  });

  describe('getLevelProgress', () => {
    it('should return 0% progress at start of level 1', () => {
      const data: LevelData = { level: 1, currentXP: 0, totalXP: 0 };
      const progress = getLevelProgress(data);
      expect(progress).toBe(0);
    });

    it('should return 50% progress halfway through level 1', () => {
      // Level 1 needs 50 XP to reach level 2
      const data: LevelData = { level: 1, currentXP: 25, totalXP: 25 };
      const progress = getLevelProgress(data);
      expect(progress).toBe(50);
    });

    it('should return 100% progress at max level', () => {
      const data: LevelData = { level: MAX_LEVEL, currentXP: 0, totalXP: 3000 };
      const progress = getLevelProgress(data);
      expect(progress).toBe(100);
    });

    it('should return correct progress at level 2', () => {
      // Level 2 starts at 50 XP, level 3 at 150 XP
      // So 100 XP total means 50 XP into level 2, which is 50% of 100 XP needed
      const data: LevelData = { level: 2, currentXP: 50, totalXP: 100 };
      const progress = getLevelProgress(data);
      expect(progress).toBe(50);
    });
  });

  describe('calculateCorrectAnswerXP', () => {
    it('should return the correct answer XP reward', () => {
      const xp = calculateCorrectAnswerXP();
      expect(xp).toBe(XP_REWARDS.correctAnswer);
      expect(xp).toBe(5);
    });
  });

  describe('calculateStreakBonusXP', () => {
    it('should return 0 for non-milestone streaks', () => {
      expect(calculateStreakBonusXP(1)).toBe(0);
      expect(calculateStreakBonusXP(3)).toBe(0);
      expect(calculateStreakBonusXP(7)).toBe(0);
      expect(calculateStreakBonusXP(15)).toBe(0);
    });

    it('should return correct bonus for streak of 5', () => {
      const xp = calculateStreakBonusXP(5);
      expect(xp).toBe(XP_REWARDS.streakBonus[5]);
      expect(xp).toBe(10);
    });

    it('should return correct bonus for streak of 10', () => {
      const xp = calculateStreakBonusXP(10);
      expect(xp).toBe(XP_REWARDS.streakBonus[10]);
      expect(xp).toBe(25);
    });

    it('should return correct bonus for streak of 20', () => {
      const xp = calculateStreakBonusXP(20);
      expect(xp).toBe(XP_REWARDS.streakBonus[20]);
      expect(xp).toBe(50);
    });

    it('should return correct bonus for streak of 50', () => {
      const xp = calculateStreakBonusXP(50);
      expect(xp).toBe(XP_REWARDS.streakBonus[50]);
      expect(xp).toBe(100);
    });

    it('should return correct bonus for streak of 100', () => {
      const xp = calculateStreakBonusXP(100);
      expect(xp).toBe(XP_REWARDS.streakBonus[100]);
      expect(xp).toBe(200);
    });
  });

  describe('calculateCompletionBonusXP', () => {
    it('should return completion bonus for non-perfect game', () => {
      const xp = calculateCompletionBonusXP(7, 10);
      expect(xp).toBe(XP_REWARDS.completionBonus);
      expect(xp).toBe(10);
    });

    it('should return completion bonus plus perfect game bonus for perfect score', () => {
      const xp = calculateCompletionBonusXP(10, 10);
      expect(xp).toBe(XP_REWARDS.completionBonus + XP_REWARDS.perfectGame);
      expect(xp).toBe(40);
    });

    it('should return only completion bonus for 0 score', () => {
      const xp = calculateCompletionBonusXP(0, 10);
      expect(xp).toBe(XP_REWARDS.completionBonus);
      expect(xp).toBe(10);
    });
  });

  describe('addXP', () => {
    it('should add XP without leveling up', () => {
      const data: LevelData = { level: 1, currentXP: 0, totalXP: 0 };
      const result = addXP(data, 20);

      expect(result.newData.level).toBe(1);
      expect(result.newData.totalXP).toBe(20);
      expect(result.newData.currentXP).toBe(20);
      expect(result.leveledUp).toBe(false);
      expect(result.newLevel).toBe(1);
    });

    it('should level up when reaching threshold', () => {
      const data: LevelData = { level: 1, currentXP: 40, totalXP: 40 };
      const result = addXP(data, 10); // 50 total = level 2

      expect(result.newData.level).toBe(2);
      expect(result.newData.totalXP).toBe(50);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(2);
    });

    it('should handle multiple level ups at once', () => {
      const data: LevelData = { level: 1, currentXP: 0, totalXP: 0 };
      const result = addXP(data, 200); // Should reach level 3 (150 XP threshold)

      expect(result.newData.level).toBe(3);
      expect(result.newData.totalXP).toBe(200);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(3);
    });

    it('should not exceed max level', () => {
      const data: LevelData = { level: MAX_LEVEL - 1, currentXP: 0, totalXP: 1800 };
      const result = addXP(data, 10000);

      expect(result.newData.level).toBe(MAX_LEVEL);
      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(MAX_LEVEL);
    });

    it('should not level up when already at max level', () => {
      const data: LevelData = { level: MAX_LEVEL, currentXP: 0, totalXP: 2500 };
      const result = addXP(data, 100);

      expect(result.newData.level).toBe(MAX_LEVEL);
      expect(result.newData.totalXP).toBe(2600);
      expect(result.leveledUp).toBe(false);
      expect(result.newLevel).toBe(MAX_LEVEL);
    });
  });

  describe('getXPUntilNextLevel', () => {
    it('should return 50 XP needed at level 1 with 0 XP', () => {
      const data: LevelData = { level: 1, currentXP: 0, totalXP: 0 };
      const xpNeeded = getXPUntilNextLevel(data);
      expect(xpNeeded).toBe(50);
    });

    it('should return 30 XP needed at level 1 with 20 XP', () => {
      const data: LevelData = { level: 1, currentXP: 20, totalXP: 20 };
      const xpNeeded = getXPUntilNextLevel(data);
      expect(xpNeeded).toBe(30);
    });

    it('should return 100 XP needed at level 2 with 50 XP', () => {
      // Level 3 requires 150 total XP
      const data: LevelData = { level: 2, currentXP: 0, totalXP: 50 };
      const xpNeeded = getXPUntilNextLevel(data);
      expect(xpNeeded).toBe(100);
    });

    it('should return 0 at max level', () => {
      const data: LevelData = { level: MAX_LEVEL, currentXP: 0, totalXP: 2500 };
      const xpNeeded = getXPUntilNextLevel(data);
      expect(xpNeeded).toBe(0);
    });
  });

  describe('Level Progression Integration', () => {
    it('should correctly progress through levels with typical gameplay', () => {
      let data: LevelData = getDefaultLevelData();

      // Play 10 quick-start games with 8 correct each (no perfect games)
      // Each game: 8 correct * 5 XP + 10 completion bonus = 50 XP
      for (let i = 0; i < 10; i++) {
        const correctXP = 8 * calculateCorrectAnswerXP(); // 40 XP
        const bonusXP = calculateCompletionBonusXP(8, 10); // 10 XP
        const result = addXP(data, correctXP + bonusXP);
        data = result.newData;
      }

      // 500 XP total should be level 5 (Champion)
      expect(data.totalXP).toBe(500);
      expect(data.level).toBe(5);
    });

    it('should award streak bonuses correctly in endless mode simulation', () => {
      let data: LevelData = getDefaultLevelData();
      let totalXP = 0;

      // Simulate getting a streak of 10 correct answers
      for (let i = 1; i <= 10; i++) {
        const correctXP = calculateCorrectAnswerXP();
        const streakXP = calculateStreakBonusXP(i);
        totalXP += correctXP + streakXP;
      }

      // 10 correct answers * 5 XP = 50 XP
      // + streak bonus at 5 = 10 XP
      // + streak bonus at 10 = 25 XP
      // Total = 85 XP
      expect(totalXP).toBe(85);

      const result = addXP(data, totalXP);
      expect(result.newData.totalXP).toBe(85);
      expect(result.newData.level).toBe(2); // Should be level 2 (50 XP threshold)
    });
  });
});
