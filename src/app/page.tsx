'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PaperBackground from '@/components/ui/PaperBackground';
import Button from '@/components/ui/Button';
import RangeSelector from '@/components/game/RangeSelector';
import TopicSelector from '@/components/game/TopicSelector';
import SoundToggle from '@/components/ui/SoundToggle';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import LevelDisplay from '@/components/game/LevelDisplay';
import { useSoundContext } from '@/contexts/SoundContext';
import { NumberRange, GameMode, Topic } from '@/types';

type MenuState = 'main' | 'topic-select' | 'range-select';

export default function Home() {
  const router = useRouter();
  const t = useTranslations();
  const [menuState, setMenuState] = useState<MenuState>('main');
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const { soundEnabled, musicPlaying, toggleSound, toggleMusic, playClick } = useSoundContext();

  const handleModeSelect = (mode: GameMode) => {
    playClick();
    setSelectedMode(mode);
    setMenuState('topic-select');
  };

  const handleTopicSelect = (topic: Topic) => {
    playClick();
    setSelectedTopic(topic);
    setMenuState('range-select');
  };

  const handleRangeSelect = (range: NumberRange) => {
    playClick();
    if (selectedMode && selectedTopic) {
      router.push(`/play/${selectedMode}?range=${range}&topic=${selectedTopic}`);
    }
  };

  const handleBack = () => {
    playClick();
    if (menuState === 'range-select') {
      setMenuState('topic-select');
    } else {
      setMenuState('main');
      setSelectedMode(null);
      setSelectedTopic(null);
    }
  };

  return (
    <PaperBackground className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Top controls */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <LanguageSwitcher />
        <SoundToggle
          soundEnabled={soundEnabled}
          musicPlaying={musicPlaying}
          onToggleSound={toggleSound}
          onToggleMusic={toggleMusic}
        />
      </div>

      {/* Level display - top left */}
      <div className="absolute top-4 left-4">
        <LevelDisplay compact showXP />
      </div>

      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-[10%] left-[10%] text-6xl animate-float opacity-20">+</span>
        <span className="absolute top-[20%] right-[15%] text-5xl animate-float opacity-20" style={{ animationDelay: '0.5s' }}>-</span>
        <span className="absolute bottom-[30%] left-[8%] text-4xl animate-float opacity-20" style={{ animationDelay: '1s' }}>1</span>
        <span className="absolute top-[40%] right-[10%] text-5xl animate-float opacity-20" style={{ animationDelay: '1.5s' }}>2</span>
        <span className="absolute bottom-[20%] right-[20%] text-6xl animate-float opacity-20" style={{ animationDelay: '2s' }}>3</span>
        <span className="absolute bottom-[15%] left-[25%] text-4xl animate-float opacity-20" style={{ animationDelay: '0.7s' }}>=</span>
        <span className="absolute top-[60%] left-[5%] text-5xl animate-float opacity-20" style={{ animationDelay: '1.2s' }}>5</span>
        <span className="absolute top-[15%] left-[40%] text-4xl animate-float opacity-20" style={{ animationDelay: '0.3s' }}>7</span>
      </div>

      {menuState === 'main' ? (
        <div className="flex flex-col items-center gap-8 animate-fade-in">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-black text-[#4A3728] mb-2">
              <span className="text-[#FF6B9D]">M</span>
              <span className="text-[#FF9F43]">a</span>
              <span className="text-[#FFD93D]">t</span>
              <span className="text-[#7CB342]">h</span>
              <span className="text-[#4ECDC4]">F</span>
              <span className="text-[#9B59B6]">u</span>
              <span className="text-[#FF6B9D]">n</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#6B5744] font-semibold">
              {t('app.tagline')}
            </p>
          </div>

          {/* Math symbols decoration */}
          <div className="flex gap-4 text-4xl opacity-60">
            <span className="text-[#FF6B9D]">+</span>
            <span className="text-[#FF9F43]">-</span>
            <span className="text-[#7CB342]">=</span>
          </div>

          {/* Mode buttons */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Button
              variant="green"
              size="xl"
              fullWidth
              onClick={() => handleModeSelect('quick-start')}
            >
              {t('menu.quickStart')}
            </Button>
            <Button
              variant="purple"
              size="xl"
              fullWidth
              onClick={() => handleModeSelect('endless')}
            >
              {t('menu.endless')}
            </Button>
          </div>
        </div>
      ) : menuState === 'topic-select' ? (
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="self-start btn-bounce flex items-center gap-2 text-[#6B5744] hover:text-[#4A3728] font-semibold transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            {t('menu.back')}
          </button>

          {/* Mode title */}
          <h2 className="text-3xl font-bold text-[#4A3728]">
            {selectedMode === 'quick-start' ? t('menu.quickStart') : t('menu.endless')}
          </h2>

          {/* Topic selector */}
          <TopicSelector onSelect={handleTopicSelect} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="self-start btn-bounce flex items-center gap-2 text-[#6B5744] hover:text-[#4A3728] font-semibold transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            {t('menu.back')}
          </button>

          {/* Mode title */}
          <h2 className="text-3xl font-bold text-[#4A3728]">
            {selectedMode === 'quick-start' ? t('menu.quickStart') : t('menu.endless')}
          </h2>

          {/* Range selector title */}
          <p className="text-lg text-[#6B5744]">{t('menu.selectRange')}</p>

          {/* Range selector */}
          <RangeSelector onSelect={handleRangeSelect} />
        </div>
      )}
    </PaperBackground>
  );
}
