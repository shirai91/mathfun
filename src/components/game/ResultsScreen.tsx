'use client';

import { useTranslations } from 'next-intl';
import Button from '../ui/Button';
import StarRating from './StarRating';
import Confetti from './Confetti';

interface ResultsScreenProps {
  score: number;
  total: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export default function ResultsScreen({
  score,
  total,
  onPlayAgain,
  onMainMenu,
}: ResultsScreenProps) {
  const t = useTranslations();
  const percentage = (score / total) * 100;
  const showConfetti = percentage >= 70;

  const getMessage = () => {
    if (percentage === 100) return t('results.perfect');
    if (percentage >= 80) return t('results.great');
    if (percentage >= 60) return t('results.good');
    return t('results.keepPracticing');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 animate-fade-in">
      <Confetti show={showConfetti} />

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-black text-[#4A3728]">
        {t('results.complete')}
      </h1>

      {/* Score */}
      <div className="text-center">
        <p className="text-6xl md:text-7xl font-black text-[#7CB342]">
          {score}/{total}
        </p>
        <p className="text-xl text-[#6B5744] mt-2">
          {getMessage()}
        </p>
      </div>

      {/* Star rating */}
      <StarRating score={score} total={total} />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button
          variant="green"
          size="lg"
          onClick={onPlayAgain}
        >
          {t('results.playAgain')}
        </Button>
        <Button
          variant="orange"
          size="lg"
          onClick={onMainMenu}
        >
          {t('results.mainMenu')}
        </Button>
      </div>
    </div>
  );
}
