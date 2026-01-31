'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSound } from '@/hooks/useSound';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';

interface SoundContextType {
  // Sound effects
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playCorrect: () => void;
  playWrong: () => void;
  playHint: () => void;
  playComplete: () => void;
  playStreak: () => void;

  // Background music
  musicPlaying: boolean;
  toggleMusic: () => void;
  playMusic: () => void;
  pauseMusic: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const sound = useSound();
  const music = useBackgroundMusic();

  const value: SoundContextType = {
    soundEnabled: sound.soundEnabled,
    toggleSound: sound.toggleSound,
    playClick: sound.playClick,
    playCorrect: sound.playCorrect,
    playWrong: sound.playWrong,
    playHint: sound.playHint,
    playComplete: sound.playComplete,
    playStreak: sound.playStreak,
    musicPlaying: music.isPlaying,
    toggleMusic: music.toggle,
    playMusic: music.play,
    pauseMusic: music.pause,
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
}
