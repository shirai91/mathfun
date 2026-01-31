'use client';

import { useTranslations } from 'next-intl';

interface SoundToggleProps {
  soundEnabled: boolean;
  musicPlaying: boolean;
  onToggleSound: () => void;
  onToggleMusic: () => void;
}

export default function SoundToggle({
  soundEnabled,
  musicPlaying,
  onToggleSound,
  onToggleMusic,
}: SoundToggleProps) {
  const t = useTranslations();

  return (
    <div className="flex gap-2">
      {/* Sound effects toggle */}
      <button
        onClick={onToggleSound}
        className={`btn-bounce w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center ${
          soundEnabled ? 'bg-[#7CB342] text-white' : 'bg-[#F5EDD8] text-[#6B5744]'
        }`}
        aria-label={soundEnabled ? t('sound.mute') : t('sound.enable')}
        title={soundEnabled ? t('sound.on') : t('sound.off')}
      >
        {soundEnabled ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
            <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
          </svg>
        )}
      </button>

      {/* Music toggle */}
      <button
        onClick={onToggleMusic}
        className={`btn-bounce w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center ${
          musicPlaying ? 'bg-[#9B59B6] text-white' : 'bg-[#F5EDD8] text-[#6B5744]'
        }`}
        aria-label={musicPlaying ? t('sound.pauseMusic') : t('sound.playMusic')}
        title={musicPlaying ? t('sound.musicPlaying') : t('sound.musicPaused')}
      >
        {musicPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M18 3.75a.75.75 0 00-1.5 0v7.5a.75.75 0 001.5 0v-7.5zM13.5 6.75a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zM9 9.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM4.5 12.75a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75z" />
            <path fillRule="evenodd" d="M1.5 12a10.5 10.5 0 1021 0 10.5 10.5 0 00-21 0zm19.5 0a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </div>
  );
}
