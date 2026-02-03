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

function PackIcon({ emoji, crossedOut = false }: { emoji: string; crossedOut?: boolean }) {
  return (
    <div className={`inline-flex flex-col items-center justify-center px-2 py-1 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm ${crossedOut ? 'opacity-30 line-through' : ''}`}>
      <span className="text-4xl md:text-5xl">{emoji}</span>
      <span className="text-xs font-semibold text-blue-700">×10</span>
    </div>
  );
}

function EmojiGroup({ count, emoji }: { count: number; emoji: string }) {
  // For numbers > 10, use pack grouping
  if (count > 10) {
    const packs = Math.floor(count / 10);
    const remaining = count % 10;

    return (
      <div className="flex flex-col gap-2 items-center">
        {/* Pack icons row */}
        <div className="flex gap-2 flex-wrap justify-center">
          {Array.from({ length: packs }, (_, i) => (
            <PackIcon key={`pack-${i}`} emoji={emoji} />
          ))}
        </div>

        {/* Individual icons row */}
        {remaining > 0 && (
          <div className="flex gap-0.5 flex-wrap justify-center max-w-[200px]">
            {Array.from({ length: remaining }, (_, i) => (
              <span key={`individual-${i}`} className="text-2xl md:text-3xl">{emoji}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // For numbers <= 10, show individual icons
  return (
    <div className="flex flex-wrap gap-0.5 max-w-[200px] justify-center">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="text-2xl md:text-3xl">{emoji}</span>
      ))}
    </div>
  );
}

function SubtractionVisual({ minuend, subtrahend, emoji }: { minuend: number; subtrahend: number; emoji: string }) {
  // For numbers > 10, use pack grouping with smart crossing out
  if (minuend > 10) {
    const totalPacks = Math.floor(minuend / 10);
    const totalRemaining = minuend % 10;

    // Calculate how many packs to cross out
    const packsToRemove = Math.floor(subtrahend / 10);
    const individualsToRemove = subtrahend % 10;

    // Determine how many individual items to cross out
    // If we need to remove more individuals than we have, we cross them all
    const individualsCrossed = Math.min(individualsToRemove, totalRemaining);

    // If we need to remove more individuals than available, we need to cross out an extra pack
    const extraPacksCrossed = individualsToRemove > totalRemaining ? 1 : 0;
    const totalPacksCrossed = Math.min(packsToRemove + extraPacksCrossed, totalPacks);

    return (
      <div className="flex flex-col gap-2 items-center">
        {/* Pack icons row */}
        <div className="flex gap-2 flex-wrap justify-center">
          {Array.from({ length: totalPacks }, (_, i) => (
            <PackIcon
              key={`pack-${i}`}
              emoji={emoji}
              crossedOut={i < totalPacksCrossed}
            />
          ))}
        </div>

        {/* Individual icons row */}
        {totalRemaining > 0 && (
          <div className="flex gap-0.5 flex-wrap justify-center max-w-[250px]">
            {Array.from({ length: totalRemaining }, (_, i) => (
              <span
                key={`individual-${i}`}
                className={`text-2xl md:text-3xl ${i < individualsCrossed ? 'opacity-30 line-through' : ''}`}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // For numbers <= 10, show individual icons with crossing out
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
