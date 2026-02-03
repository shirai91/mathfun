'use client';

import { useMemo } from 'react';
import { Question } from '@/types';

const HINT_EMOJIS = ['🍬', '⭐', '🌙', '🌲', '🍎', '🍊', '🚗'];

// Simple hash function to get a number from a string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

function EmojiGroup({ count, emoji }: { count: number; emoji: string }) {
  // For larger numbers, show in rows of 5
  if (count > 10) {
    const rows = Math.ceil(count / 5);
    return (
      <div className="flex flex-col gap-1">
        {Array.from({ length: rows }, (_, rowIndex) => {
          const itemsInRow = Math.min(5, count - rowIndex * 5);
          return (
            <div key={rowIndex} className="flex gap-0.5">
              {Array.from({ length: itemsInRow }, (_, i) => (
                <span key={i} className="text-2xl md:text-3xl">{emoji}</span>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-0.5 max-w-[200px] justify-center">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="text-2xl md:text-3xl">{emoji}</span>
      ))}
    </div>
  );
}

function SubtractionVisual({ minuend, subtrahend, emoji }: { minuend: number; subtrahend: number; emoji: string }) {
  // Show minuend with some crossed out (the ones being taken away)
  return (
    <div className="flex flex-wrap gap-0.5 max-w-[250px] justify-center">
      {Array.from({ length: minuend }, (_, i) => (
        <span
          key={i}
          className={`text-2xl md:text-3xl ${i < subtrahend ? 'opacity-30 line-through' : ''}`}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

interface VisualHintProps {
  question: Question;
  show: boolean;
}

export default function VisualHint({ question, show }: VisualHintProps) {
  // Pick a random emoji based on question ID (consistent for same question)
  const emoji = useMemo(() => {
    const index = hashString(question.id) % HINT_EMOJIS.length;
    return HINT_EMOJIS[index];
  }, [question.id]);

  if (!show) return null;

  // Get the actual values (fill in the answer for null values)
  const operand1 = question.operand1 ?? question.answer;
  const operand2 = question.operand2 ?? question.answer;

  if (question.operation === '+') {
    // Addition: show both groups with "+" between them
    // Kids count the total themselves
    return (
      <div className="animate-bounce-in bg-[#FFF8E7] rounded-2xl p-4 shadow-lg border-2 border-[#FFD93D]">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <EmojiGroup count={operand1} emoji={emoji} />
          <span className="text-3xl font-black text-[#7CB342]">+</span>
          <EmojiGroup count={operand2} emoji={emoji} />
        </div>
      </div>
    );
  }

  // Subtraction: show all items with some crossed out
  // Kids count the remaining (non-crossed) items
  return (
    <div className="animate-bounce-in bg-[#FFF8E7] rounded-2xl p-4 shadow-lg border-2 border-[#FFD93D]">
      <SubtractionVisual minuend={operand1} subtrahend={operand2} emoji={emoji} />
    </div>
  );
}
