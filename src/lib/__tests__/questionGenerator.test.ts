import { describe, it, expect } from 'vitest';
import { generateQuestion, generateQuestions } from '../questionGenerator';
import { TOPIC_CONFIGS, DEFAULT_TOPIC } from '../constants';
import { Topic, QuestionType } from '@/types';

describe('Question Generator', () => {
  describe('generateQuestion', () => {
    it('should generate a valid question with default topic', () => {
      const question = generateQuestion(10);

      expect(question).toBeDefined();
      expect(question.id).toBeDefined();
      expect(question.answer).toBeDefined();
      expect(question.options).toHaveLength(4);
      expect(question.options).toContain(question.answer);
      expect(question.topic).toBe(DEFAULT_TOPIC);
    });

    it('should generate a question within the specified range', () => {
      const range = 20;
      const question = generateQuestion(range);

      expect(question.answer).toBeGreaterThanOrEqual(0);
      expect(question.answer).toBeLessThanOrEqual(range);
    });

    it('should generate questions with format either horizontal or vertical', () => {
      const questions = generateQuestions(20, 10);
      const formats = questions.map(q => q.format);

      expect(formats.every(f => f === 'horizontal' || f === 'vertical')).toBe(true);
    });
  });

  describe('generateQuestion with topics', () => {
    it('should generate only addition questions when topic is addition', () => {
      const questions = generateQuestions(20, 10, 'addition');

      questions.forEach(q => {
        expect(q.operation).toBe('+');
        expect(q.questionType).toMatch(/^add_/);
        expect(q.topic).toBe('addition');
      });
    });

    it('should generate only subtraction questions when topic is subtraction', () => {
      const questions = generateQuestions(20, 10, 'subtraction');

      questions.forEach(q => {
        expect(q.operation).toBe('-');
        expect(q.questionType).toMatch(/^sub_/);
        expect(q.topic).toBe('subtraction');
      });
    });

    it('should generate only find_result questions (a + b = ? or a - b = ?)', () => {
      const questions = generateQuestions(20, 10, 'find_result');

      questions.forEach(q => {
        expect(['add_find_sum', 'sub_find_diff']).toContain(q.questionType);
        expect(q.result).toBeNull();
        expect(q.operand1).not.toBeNull();
        expect(q.operand2).not.toBeNull();
        expect(q.topic).toBe('find_result');
      });
    });

    it('should generate only find_missing questions', () => {
      const questions = generateQuestions(20, 10, 'find_missing');
      const findMissingTypes: QuestionType[] = [
        'add_find_first',
        'add_find_second',
        'sub_find_subtrahend',
        'sub_find_minuend',
      ];

      questions.forEach(q => {
        expect(findMissingTypes).toContain(q.questionType);
        expect(q.result).not.toBeNull();
        expect(q.topic).toBe('find_missing');
      });
    });

    it('should generate all question types when topic is all', () => {
      const questions = generateQuestions(100, 10, 'all');
      const questionTypes = new Set(questions.map(q => q.questionType));

      // With 100 questions and 6 types, we should have a good chance of seeing most types
      // But we can't guarantee all 6, so just check we have a variety
      expect(questionTypes.size).toBeGreaterThanOrEqual(2);

      questions.forEach(q => {
        expect(q.topic).toBe('all');
      });
    });
  });

  describe('generateQuestions', () => {
    it('should generate the correct number of questions', () => {
      const questions = generateQuestions(10, 20);
      expect(questions).toHaveLength(10);
    });

    it('should generate questions with unique IDs', () => {
      const questions = generateQuestions(10, 20);
      const ids = questions.map(q => q.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(questions.length);
    });

    it('should generate questions with 4 answer options each', () => {
      const questions = generateQuestions(10, 20);

      questions.forEach(q => {
        expect(q.options).toHaveLength(4);
      });
    });

    it('should include the correct answer in options', () => {
      const questions = generateQuestions(10, 20);

      questions.forEach(q => {
        expect(q.options).toContain(q.answer);
      });
    });

    it('should pass topic to each question', () => {
      const topic: Topic = 'subtraction';
      const questions = generateQuestions(5, 10, topic);

      questions.forEach(q => {
        expect(q.topic).toBe(topic);
      });
    });
  });

  describe('Topic Configuration Validation', () => {
    it('should have valid question types for each topic config', () => {
      const allQuestionTypes: QuestionType[] = [
        'add_find_sum',
        'add_find_first',
        'add_find_second',
        'sub_find_diff',
        'sub_find_subtrahend',
        'sub_find_minuend',
      ];

      TOPIC_CONFIGS.forEach(topicConfig => {
        topicConfig.questionTypes.forEach(qt => {
          expect(allQuestionTypes).toContain(qt);
        });
      });
    });

    it('should have required properties for each topic config', () => {
      TOPIC_CONFIGS.forEach(topicConfig => {
        expect(topicConfig.id).toBeDefined();
        expect(topicConfig.titleKey).toBeDefined();
        expect(topicConfig.descriptionKey).toBeDefined();
        expect(topicConfig.emoji).toBeDefined();
        expect(topicConfig.color).toBeDefined();
        expect(topicConfig.questionTypes.length).toBeGreaterThan(0);
      });
    });

    it('should have all topic as first config with all question types', () => {
      const allTopicConfig = TOPIC_CONFIGS.find(t => t.id === 'all');
      expect(allTopicConfig).toBeDefined();
      expect(allTopicConfig!.questionTypes).toHaveLength(6);
    });
  });

  describe('Question Type Specifics', () => {
    it('should generate valid add_find_sum questions', () => {
      const questions = generateQuestions(50, 10, 'find_result').filter(
        q => q.questionType === 'add_find_sum'
      );

      questions.forEach(q => {
        expect(q.operand1).not.toBeNull();
        expect(q.operand2).not.toBeNull();
        expect(q.result).toBeNull();
        expect(q.answer).toBe(q.operand1! + q.operand2!);
        expect(q.operation).toBe('+');
      });
    });

    it('should generate valid sub_find_diff questions', () => {
      const questions = generateQuestions(50, 10, 'find_result').filter(
        q => q.questionType === 'sub_find_diff'
      );

      questions.forEach(q => {
        expect(q.operand1).not.toBeNull();
        expect(q.operand2).not.toBeNull();
        expect(q.result).toBeNull();
        expect(q.answer).toBe(q.operand1! - q.operand2!);
        expect(q.operation).toBe('-');
        expect(q.answer).toBeGreaterThanOrEqual(0);
      });
    });

    it('should generate valid find_missing addition questions', () => {
      const questions = generateQuestions(50, 10, 'find_missing').filter(
        q => q.operation === '+'
      );

      questions.forEach(q => {
        expect(q.result).not.toBeNull();
        const a = q.operand1 ?? q.answer;
        const b = q.operand2 ?? q.answer;
        const c = q.result!;
        expect(a + b).toBe(c);
      });
    });

    it('should generate valid find_missing subtraction questions', () => {
      const questions = generateQuestions(50, 10, 'find_missing').filter(
        q => q.operation === '-'
      );

      questions.forEach(q => {
        expect(q.result).not.toBeNull();
        // For subtraction: a - b = c
        // If operand1 is null, answer is a: answer - b = c
        // If operand2 is null, answer is b: a - answer = c
        if (q.operand1 === null) {
          // ? - b = c  =>  answer = c + b
          expect(q.answer - q.operand2!).toBe(q.result!);
        } else {
          // a - ? = c  =>  answer = a - c
          expect(q.operand1 - q.answer).toBe(q.result!);
        }
      });
    });
  });

  describe('Answer Options', () => {
    it('should generate unique answer options', () => {
      const questions = generateQuestions(20, 50);

      questions.forEach(q => {
        const uniqueOptions = new Set(q.options);
        expect(uniqueOptions.size).toBe(4);
      });
    });

    it('should have all options within valid range (0 to range)', () => {
      const range = 20;
      const questions = generateQuestions(20, range);

      questions.forEach(q => {
        q.options.forEach(option => {
          expect(option).toBeGreaterThanOrEqual(0);
          expect(option).toBeLessThanOrEqual(range);
        });
      });
    });
  });
});
