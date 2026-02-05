export interface Question {
  id: string;
  display: string;
  operand1: number | null;
  operand2: number | null;
  result: number | null;
  answer: number;
  options: number[];
  format: 'horizontal' | 'vertical';
  operation: '+' | '-';
  questionType: QuestionType;
}

export type QuestionType =
  | 'add_find_sum'        // a + b = _
  | 'add_find_first'      // _ + b = c
  | 'add_find_second'     // a + _ = c
  | 'sub_find_diff'       // a - b = _
  | 'sub_find_subtrahend' // a - _ = c
  | 'sub_find_minuend';   // _ - b = c

export type NumberRange = 10 | 20 | 50 | 100;

export type GameMode = 'quick-start' | 'endless';

export interface QuickStartState {
  questions: Question[];
  currentIndex: number;
  score: number;
  answers: (boolean | null)[];
  isComplete: boolean;
  hintsUsed: number;
}

export interface EndlessState {
  currentQuestion: Question;
  totalAnswered: number;
  totalCorrect: number;
  currentStreak: number;
  bestStreak: number;
  hintsUsed: number;
}

export interface GameSettings {
  range: NumberRange;
  soundEnabled: boolean;
  musicEnabled: boolean;
}

// Level System Types
export interface LevelData {
  level: number;
  currentXP: number;
  totalXP: number;
}

export interface LevelConfig {
  level: number;
  xpRequired: number;
  title: string;
  titleKey: string; // For i18n
}

export interface XPGain {
  amount: number;
  reason: 'correct_answer' | 'streak_bonus' | 'perfect_game' | 'completion_bonus';
}
