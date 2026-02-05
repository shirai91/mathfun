'use client';

import { useState, useEffect } from 'react';

interface XPGain {
  id: number;
  amount: number;
  x: number;
  y: number;
}

interface XPGainIndicatorProps {
  xpAmount: number;
  trigger: boolean;
}

export default function XPGainIndicator({ xpAmount, trigger }: XPGainIndicatorProps) {
  const [gains, setGains] = useState<XPGain[]>([]);

  useEffect(() => {
    if (trigger && xpAmount > 0) {
      const newGain: XPGain = {
        id: Date.now(),
        amount: xpAmount,
        x: Math.random() * 40 - 20, // Random horizontal offset
        y: 0,
      };

      setGains((prev) => [...prev, newGain]);

      // Remove after animation completes
      setTimeout(() => {
        setGains((prev) => prev.filter((g) => g.id !== newGain.id));
      }, 1500);
    }
  }, [trigger, xpAmount]);

  return (
    <div className="pointer-events-none">
      {gains.map((gain) => (
        <div
          key={gain.id}
          className="absolute animate-xp-float text-lg font-black text-[#FFD700] drop-shadow-md"
          style={{
            left: `calc(50% + ${gain.x}px)`,
            transform: 'translateX(-50%)',
          }}
        >
          +{gain.amount} XP
        </div>
      ))}
    </div>
  );
}
