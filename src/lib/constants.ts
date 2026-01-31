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
