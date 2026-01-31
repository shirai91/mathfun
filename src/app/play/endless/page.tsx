'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PaperBackground from '@/components/ui/PaperBackground';
import Question from '@/components/game/Question';
import AnswerGrid from '@/components/game/AnswerGrid';
import StreakDisplay from '@/components/game/StreakDisplay';
import HintButton from '@/components/ui/HintButton';
import EndlessStats from '@/components/game/EndlessStats';
import Confetti from '@/components/game/Confetti';
import Button from '@/components/ui/Button';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { useSoundContext } from '@/contexts/SoundContext';
import { generateQuestion } from '@/lib/questionGenerator';
import { NumberRange, EndlessState } from '@/types';
import { STREAK_MILESTONES } from '@/lib/constants';

function EndlessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const range = (parseInt(searchParams.get('range') || '10') as NumberRange) || 10;
  const { playCorrect, playWrong, playHint, playStreak, playClick } = useSoundContext();

  const [gameState, setGameState] = useState<EndlessState | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hintedAnswer, setHintedAnswer] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const initGame = useCallback(() => {
    setGameState({
      currentQuestion: generateQuestion(range),
      totalAnswered: 0,
      totalCorrect: 0,
      currentStreak: 0,
      bestStreak: 0,
      hintsUsed: 0,
    });
    setSelectedAnswer(null);
    setHintedAnswer(null);
    setIsAnswering(false);
    setShowCorrectAnimation(false);
    setShowStats(false);
  }, [range]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleAnswer = (answer: number) => {
    if (!gameState || isAnswering) return;

    setSelectedAnswer(answer);
    setIsAnswering(true);

    const isCorrect = answer === gameState.currentQuestion.answer;
    const newStreak = isCorrect ? gameState.currentStreak + 1 : 0;

    if (isCorrect) {
      playCorrect();
      setShowCorrectAnimation(true);

      if (STREAK_MILESTONES.includes(newStreak as typeof STREAK_MILESTONES[number])) {
        setTimeout(() => playStreak(), 300);
      }
    } else {
      playWrong();
    }

    setTimeout(() => {
      setGameState((prev) => {
        if (!prev) return null;

        const newBestStreak = Math.max(prev.bestStreak, newStreak);

        return {
          ...prev,
          currentQuestion: generateQuestion(range),
          totalAnswered: prev.totalAnswered + 1,
          totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
          currentStreak: newStreak,
          bestStreak: newBestStreak,
        };
      });

      setSelectedAnswer(null);
      setHintedAnswer(null);
      setIsAnswering(false);
      setShowCorrectAnimation(false);
    }, isCorrect ? 1200 : 800);
  };

  const handleHint = () => {
    if (!gameState || hintedAnswer !== null) return;

    playHint();
    setHintedAnswer(gameState.currentQuestion.answer);
    setGameState((prev) => prev ? { ...prev, hintsUsed: prev.hintsUsed + 1 } : null);

    setTimeout(() => {
      setHintedAnswer(null);
    }, 2000);
  };

  const handleExit = () => {
    playClick();
    setShowExitDialog(true);
  };

  const handleConfirmExit = () => {
    playClick();
    setShowStats(true);
    setShowExitDialog(false);
  };

  const handleMainMenu = () => {
    playClick();
    router.push('/');
  };

  const handleContinue = () => {
    playClick();
    setShowStats(false);
  };

  if (!gameState) {
    return (
      <PaperBackground className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-[#4A3728]">{t('game.loading')}</div>
      </PaperBackground>
    );
  }

  if (showStats) {
    return (
      <PaperBackground className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black text-[#4A3728] mb-8">{t('endless.greatSession')}</h1>

        <EndlessStats
          totalAnswered={gameState.totalAnswered}
          totalCorrect={gameState.totalCorrect}
          bestStreak={gameState.bestStreak}
        />

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button variant="green" size="lg" onClick={handleContinue}>
            {t('endless.continue')}
          </Button>
          <Button variant="orange" size="lg" onClick={handleMainMenu}>
            {t('results.mainMenu')}
          </Button>
        </div>
      </PaperBackground>
    );
  }

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      <Confetti show={showCorrectAnimation} />

      <header className="flex items-center justify-between p-4">
        <button
          onClick={handleExit}
          className="btn-bounce flex items-center justify-center w-14 h-14 rounded-full bg-[#FF9F43] hover:bg-[#E88E32] text-white shadow-lg transition-all"
          aria-label={t('endless.exit')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-3xl font-black text-[#7CB342]">{gameState.totalCorrect}</p>
            <p className="text-xs text-[#6B5744]">{t('endless.correctAnswers')}</p>
          </div>

          <StreakDisplay
            streak={gameState.currentStreak}
            bestStreak={gameState.bestStreak}
          />
        </div>

        <div className="w-14" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <div className="mb-4">
          <Question question={gameState.currentQuestion} />
        </div>

        <AnswerGrid
          options={gameState.currentQuestion.options}
          correctAnswer={gameState.currentQuestion.answer}
          selectedAnswer={selectedAnswer}
          hintedAnswer={hintedAnswer}
          onSelect={handleAnswer}
          disabled={isAnswering}
        />
      </main>

      <div className="fixed bottom-6 left-6">
        <HintButton
          onClick={handleHint}
          disabled={isAnswering || hintedAnswer !== null}
        />
      </div>

      <ConfirmDialog
        isOpen={showExitDialog}
        title={t('endless.exit')}
        message={t('endless.confirmExit')}
        confirmText={t('endless.yes')}
        cancelText={t('endless.no')}
        onConfirm={handleConfirmExit}
        onCancel={() => setShowExitDialog(false)}
      />
    </PaperBackground>
  );
}

export default function EndlessPage() {
  const t = useTranslations();

  return (
    <Suspense fallback={
      <PaperBackground className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-[#4A3728]">{t('game.loading')}</div>
      </PaperBackground>
    }>
      <EndlessContent />
    </Suspense>
  );
}
