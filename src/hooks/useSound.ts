'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SOUND_PATHS, SoundName } from '@/lib/sounds';

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRefs = useRef<Map<SoundName, HTMLAudioElement>>(new Map());
  const [loaded, setLoaded] = useState(false);

  // Load sounds on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check localStorage for sound preference first
    try {
      const savedPreference = localStorage.getItem('mathfun-sound');
      if (savedPreference !== null) {
        setSoundEnabled(savedPreference === 'true');
      }
    } catch {
      // localStorage not available
    }

    const loadPromises: Promise<void>[] = [];

    (Object.keys(SOUND_PATHS) as SoundName[]).forEach((name) => {
      if (name === 'background') return; // Skip background music

      const audio = new Audio();
      audio.preload = 'auto';

      const loadPromise = new Promise<void>((resolve) => {
        audio.addEventListener('canplaythrough', () => resolve(), { once: true });
        audio.addEventListener('error', () => resolve(), { once: true }); // Resolve even on error
      });

      audio.src = SOUND_PATHS[name];
      audioRefs.current.set(name, audio);
      loadPromises.push(loadPromise);
    });

    Promise.all(loadPromises).then(() => setLoaded(true));

    return () => {
      audioRefs.current.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      audioRefs.current.clear();
    };
  }, []);

  const playSound = useCallback((name: SoundName) => {
    if (!soundEnabled || name === 'background') return;

    const audio = audioRefs.current.get(name);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore errors (sound file might not exist or autoplay blocked)
      });
    }
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem('mathfun-sound', String(newValue));
      return newValue;
    });
  }, []);

  return {
    soundEnabled,
    toggleSound,
    loaded,
    playClick: () => playSound('click'),
    playCorrect: () => playSound('correct'),
    playWrong: () => playSound('wrong'),
    playHint: () => playSound('hint'),
    playComplete: () => playSound('complete'),
    playStreak: () => playSound('streak'),
  };
}
