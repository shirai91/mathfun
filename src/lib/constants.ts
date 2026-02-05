export const COLORS = {
  paper: '#FFF8E7',
  paperDark: '#F5EDD8',
  text: '#4A3728',
  textLight: '#6B5744',

  blue: '#4ECDC4',
  blueHover: '#3DBDB4',

  green: '#7CB342',
  greenHover: '#6BA032',

  orange: '#FF9F43',
  orangeHover: '#E88E32',

  pink: '#FF6B9D',
  pinkHover: '#E85A8C',

  purple: '#9B59B6',
  purpleHover: '#8A48A5',

  yellow: '#FFD93D',
  yellowHover: '#ECC82C',

  red: '#FF6B6B',
  redLight: '#FFE5E5',

  correct: '#7CB342',
  wrong: '#FF6B6B',
} as const;

export const QUICK_START_QUESTIONS = 10;

export const RANGE_OPTIONS = [10, 20, 50, 100] as const;

export const STAR_RATINGS = {
  three: 10,
  two: 7,
  one: 4,
} as const;

export const STREAK_MILESTONES = [5, 10, 20, 50, 100] as const;

// Level System Constants
export const LEVEL_CONFIGS = [
  { level: 1, xpRequired: 0, title: 'Beginner', titleKey: 'level.titles.beginner' },
  { level: 2, xpRequired: 50, title: 'Learner', titleKey: 'level.titles.learner' },
  { level: 3, xpRequired: 150, title: 'Explorer', titleKey: 'level.titles.explorer' },
  { level: 4, xpRequired: 300, title: 'Achiever', titleKey: 'level.titles.achiever' },
  { level: 5, xpRequired: 500, title: 'Champion', titleKey: 'level.titles.champion' },
  { level: 6, xpRequired: 750, title: 'Expert', titleKey: 'level.titles.expert' },
  { level: 7, xpRequired: 1050, title: 'Master', titleKey: 'level.titles.master' },
  { level: 8, xpRequired: 1400, title: 'Genius', titleKey: 'level.titles.genius' },
  { level: 9, xpRequired: 1800, title: 'Legend', titleKey: 'level.titles.legend' },
  { level: 10, xpRequired: 2250, title: 'Math Wizard', titleKey: 'level.titles.mathWizard' },
] as const;

export const MAX_LEVEL = LEVEL_CONFIGS.length;

// XP rewards
export const XP_REWARDS = {
  correctAnswer: 5,
  streakBonus: {
    5: 10,
    10: 25,
    20: 50,
    50: 100,
    100: 200,
  },
  perfectGame: 30, // Bonus for 100% in quick-start
  completionBonus: 10, // Bonus for completing quick-start
} as const;

// Level colors for visual display
export const LEVEL_COLORS = [
  '#7CB342', // Level 1 - Green
  '#4ECDC4', // Level 2 - Teal
  '#FF9F43', // Level 3 - Orange
  '#FF6B9D', // Level 4 - Pink
  '#9B59B6', // Level 5 - Purple
  '#3498DB', // Level 6 - Blue
  '#E74C3C', // Level 7 - Red
  '#F39C12', // Level 8 - Gold
  '#1ABC9C', // Level 9 - Emerald
  '#FFD700', // Level 10 - Golden
] as const;
