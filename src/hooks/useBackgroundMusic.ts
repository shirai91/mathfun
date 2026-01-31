'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SOUND_PATHS } from '@/lib/sounds';

export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio();
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = volume;
    audio.src = SOUND_PATHS.background;
    audioRef.current = audio;

    // Check localStorage for music preference
    try {
      const savedPreference = localStorage.getItem('mathfun-music');
      if (savedPreference === 'true') {
        // Don't auto-play due to browser policies, but remember preference
        setIsPlaying(false);
      }
    } catch {
      // localStorage not available
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        try { localStorage.setItem('mathfun-music', 'true'); } catch { /* ignore */ }
      }).catch(() => {
        // Autoplay blocked or file not found
        setIsPlaying(false);
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      try { localStorage.setItem('mathfun-music', 'false'); } catch { /* ignore */ }
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const setVolumeLevel = useCallback((level: number) => {
    const clampedLevel = Math.max(0, Math.min(1, level));
    setVolume(clampedLevel);
    if (audioRef.current) {
      audioRef.current.volume = clampedLevel;
    }
  }, []);

  return {
    isPlaying,
    volume,
    play,
    pause,
    toggle,
    setVolume: setVolumeLevel,
  };
}
