import { Question, QuestionType, NumberRange } from '@/types';

// Browser-compatible unique ID generator
let idCounter = 0;
function generateId(): string {
  idCounter++;
  return `q_${Date.now()}_${idCounter}_${Math.random().toString(36).substring(2, 9)}`;
}

const QUESTION_TYPES: QuestionType[] = [
  'add_find_sum',
  'add_find_first',
  'add_find_second',
  'sub_find_diff',
  'sub_find_subtrahend',
  'sub_find_minuend',
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateWrongAnswers(correctAnswer: number, range: NumberRange): number[] {
  const wrongAnswers = new Set<number>();
  const maxAttempts = 100;
  let attempts = 0;

  while (wrongAnswers.size < 3 && attempts < maxAttempts) {
    attempts++;

    // Generate plausible wrong answers close to the correct answer
    const offset = randomInt(-5, 5);
    let wrong = correctAnswer + offset;

    // Ensure wrong answer is valid
    if (wrong >= 0 && wrong <= range && wrong !== correctAnswer && !wrongAnswers.has(wrong)) {
      wrongAnswers.add(wrong);
    }
  }

  // If we couldn't generate enough, fill with random numbers
  while (wrongAnswers.size < 3) {
    const wrong = randomInt(0, range);
    if (wrong !== correctAnswer && !wrongAnswers.has(wrong)) {
      wrongAnswers.add(wrong);
    }
  }

  return Array.from(wrongAnswers);
}

function generateQuestionByType(type: QuestionType, range: NumberRange): {
  operand1: number | null;
  operand2: number | null;
  result: number | null;
  answer: number;
  display: string;
  operation: '+' | '-';
} {
  let a: number, b: number, c: number;

  switch (type) {
    case 'add_find_sum': // a + b = _
      a = randomInt(0, range);
      b = randomInt(0, range - a);
      c = a + b;
      return {
        operand1: a,
        operand2: b,
        result: null,
        answer: c,
        display: `${a} + ${b} = ?`,
        operation: '+',
      };

    case 'add_find_first': // _ + b = c
      c = randomInt(1, range);
      b = randomInt(0, c);
      a = c - b;
      return {
        operand1: null,
        operand2: b,
        result: c,
        answer: a,
        display: `? + ${b} = ${c}`,
        operation: '+',
      };

    case 'add_find_second': // a + _ = c
      c = randomInt(1, range);
      a = randomInt(0, c);
      b = c - a;
      return {
        operand1: a,
        operand2: null,
        result: c,
        answer: b,
        display: `${a} + ? = ${c}`,
        operation: '+',
      };

    case 'sub_find_diff': // a - b = _
      a = randomInt(0, range);
      b = randomInt(0, a);
      c = a - b;
      return {
        operand1: a,
        operand2: b,
        result: null,
        answer: c,
        display: `${a} - ${b} = ?`,
        operation: '-',
      };

    case 'sub_find_subtrahend': // a - _ = c
      a = randomInt(0, range);
      c = randomInt(0, a);
      b = a - c;
      return {
        operand1: a,
        operand2: null,
        result: c,
        answer: b,
        display: `${a} - ? = ${c}`,
        operation: '-',
      };

    case 'sub_find_minuend': // _ - b = c
      c = randomInt(0, range);
      b = randomInt(0, range - c);
      a = b + c;
      return {
        operand1: null,
        operand2: b,
        result: c,
        answer: a,
        display: `? - ${b} = ${c}`,
        operation: '-',
      };

    default:
      throw new Error(`Unknown question type: ${type}`);
  }
}

export function generateQuestion(range: NumberRange): Question {
  const type = QUESTION_TYPES[randomInt(0, QUESTION_TYPES.length - 1)];
  const format: 'horizontal' | 'vertical' = Math.random() > 0.5 ? 'horizontal' : 'vertical';

  const questionData = generateQuestionByType(type, range);
  const wrongAnswers = generateWrongAnswers(questionData.answer, range);
  const options = shuffleArray([questionData.answer, ...wrongAnswers]);

  return {
    id: generateId(),
    ...questionData,
    options,
    format,
    questionType: type,
  };
}

export function generateQuestions(count: number, range: NumberRange): Question[] {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(range));
  }

  return questions;
}
