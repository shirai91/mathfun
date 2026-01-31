'use client';

import { useState, useEffect } from 'react';

type AnswerState = 'default' | 'correct' | 'wrong' | 'hint';

interface AnswerBubbleProps {
  value: number;
  onClick: () => void;
  state?: AnswerState;
  disabled?: boolean;
  index: number;
}

const bubbleColors = [
  { bg: 'bg-[#4ECDC4]', hover: 'hover:bg-[#3DBDB4]' },
  { bg: 'bg-[#FF9F43]', hover: 'hover:bg-[#E88E32]' },
  { bg: 'bg-[#9B59B6]', hover: 'hover:bg-[#8A48A5]' },
  { bg: 'bg-[#FF6B9D]', hover: 'hover:bg-[#E85A8C]' },
];

export default function AnswerBubble({
  value,
  onClick,
  state = 'default',
  disabled = false,
  index,
}: AnswerBubbleProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (state === 'wrong') {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const color = bubbleColors[index % bubbleColors.length];

  const getStateStyles = () => {
    switch (state) {
      case 'correct':
        return 'bg-[#7CB342] scale-110 ring-4 ring-[#7CB342]/50';
      case 'wrong':
        return 'bg-[#FF6B6B]';
      case 'hint':
        return `${color.bg} animate-pulse-glow`;
      default:
        return `${color.bg} ${color.hover}`;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || state === 'correct'}
      className={`
        btn-bounce
        w-20 h-20 md:w-24 md:h-24
        rounded-full
        text-white text-3xl md:text-4xl font-black
        shadow-lg
        transition-all duration-200
        ${getStateStyles()}
        ${animate ? 'animate-shake' : ''}
        ${disabled ? 'opacity-70 cursor-not-allowed transform-none' : 'cursor-pointer'}
      `}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {value}
    </button>
  );
}
