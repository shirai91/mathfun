'use client';

import AnswerBubble from './AnswerBubble';

interface AnswerGridProps {
  options: number[];
  correctAnswer: number;
  selectedAnswer: number | null;
  onSelect: (answer: number) => void;
  disabled?: boolean;
}

export default function AnswerGrid({
  options,
  correctAnswer,
  selectedAnswer,
  onSelect,
  disabled = false,
}: AnswerGridProps) {
  const getAnswerState = (option: number) => {
    if (selectedAnswer === option) {
      return option === correctAnswer ? 'correct' : 'wrong';
    }
    return 'default';
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      {options.map((option, index) => (
        <AnswerBubble
          key={`${option}-${index}`}
          value={option}
          onClick={() => onSelect(option)}
          state={getAnswerState(option)}
          disabled={disabled}
          index={index}
        />
      ))}
    </div>
  );
}
