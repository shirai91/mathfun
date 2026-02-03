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
  // For larger numbers (>10), group into packs of 10 for better visualization
  if (count > 10) {
    const packs = Math.floor(count / 10);
    const remainder = count % 10;
    
    return (
      <div className="flex flex-col gap-2 items-center">
        {/* Packs of 10 - larger icons */}
        {packs > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
            {Array.from({ length: packs }, (_, i) => (
              <div key={i} className="flex items-center bg-yellow-100 rounded-lg px-2 py-1 border-2 border-yellow-300">
                <span className="text-4xl md:text-5xl">{emoji}</span>
                <span className="text-sm font-bold text-yellow-700 ml-1">×10</span>
              </div>
            ))}
          </div>
        )}
        {/* Remainder - regular size */}
        {remainder > 0 && (
          <div className="flex flex-wrap gap-0.5 justify-center">
            {Array.from({ length: remainder }, (_, i) => (
              <span key={i} className="text-2xl md:text-3xl">{emoji}</span>
            ))}
          </div>
        )}
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
  // For larger numbers, use pack visualization
  if (minuend > 10) {
    const packs = Math.floor(minuend / 10);
    const remainder = minuend % 10;
    let crossedCount = subtrahend;
    
    return (
      <div className="flex flex-col gap-2 items-center">
        {/* Packs of 10 */}
        {packs > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
            {Array.from({ length: packs }, (_, i) => {
              const packStart = i * 10;
              const packEnd = packStart + 10;
              const crossedInPack = Math.min(10, Math.max(0, crossedCount - packStart));
              const isCrossed = crossedInPack === 10;
              const isPartial = crossedInPack > 0 && crossedInPack < 10;
              
              return (
                <div 
                  key={i} 
                  className={`flex items-center rounded-lg px-2 py-1 border-2 ${
                    isCrossed 
                      ? 'bg-gray-200 border-gray-300 opacity-30 line-through' 
                      : isPartial
                        ? 'bg-orange-100 border-orange-300'
                        : 'bg-yellow-100 border-yellow-300'
                  }`}
                >
                  <span className="text-4xl md:text-5xl">{emoji}</span>
                  <span className={`text-sm font-bold ml-1 ${isCrossed ? 'text-gray-500' : isPartial ? 'text-orange-700' : 'text-yellow-700'}`}>
                    {isPartial ? `×${10 - crossedInPack}` : '×10'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {/* Remainder */}
        {remainder > 0 && (
          <div className="flex flex-wrap gap-0.5 justify-center">
            {Array.from({ length: remainder }, (_, i) => {
              const actualIndex = packs * 10 + i;
              return (
                <span
                  key={i}
                  className={`text-2xl md:text-3xl ${actualIndex < subtrahend ? 'opacity-30 line-through' : ''}`}
                >
                  {emoji}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  }

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
