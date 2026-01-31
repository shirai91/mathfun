'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PaperBackground from '@/components/ui/PaperBackground';
import GameHeader from '@/components/layout/GameHeader';
import Question from '@/components/game/Question';
import AnswerGrid from '@/components/game/AnswerGrid';
import ScoreBoard from '@/components/game/ScoreBoard';
import HintButton from '@/components/ui/HintButton';
import ResultsScreen from '@/components/game/ResultsScreen';
import Confetti from '@/components/game/Confetti';
import { useSoundContext } from '@/contexts/SoundContext';
import { generateQuestions } from '@/lib/questionGenerator';
import { Question as QuestionType, NumberRange, QuickStartState } from '@/types';
import { QUICK_START_QUESTIONS } from '@/lib/constants';

function QuickStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const range = (parseInt(searchParams.get('range') || '10') as NumberRange) || 10;
  const { playCorrect, playWrong, playHint, playComplete, playClick } = useSoundContext();

  const [gameState, setGameState] = useState<QuickStartState | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hintedAnswer, setHintedAnswer] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);

  const initGame = useCallback(() => {
    const questions = generateQuestions(QUICK_START_QUESTIONS, range);
    setGameState({
      questions,
      currentIndex: 0,
      score: 0,
      answers: new Array(QUICK_START_QUESTIONS).fill(null),
      isComplete: false,
      hintsUsed: 0,
    });
    setSelectedAnswer(null);
    setHintedAnswer(null);
    setIsAnswering(false);
    setShowCorrectAnimation(false);
  }, [range]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const currentQuestion: QuestionType | null = gameState?.questions[gameState.currentIndex] || null;

  const handleAnswer = (answer: number) => {
    if (!gameState || !currentQuestion || isAnswering) return;

    setSelectedAnswer(answer);
    setIsAnswering(true);

    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      playCorrect();
      setShowCorrectAnimation(true);
    } else {
      playWrong();
    }

    setTimeout(() => {
      const isLastQuestion = gameState.currentIndex === QUICK_START_QUESTIONS - 1;

      setGameState((prev) => {
        if (!prev) return null;

        const newAnswers = [...prev.answers];
        newAnswers[prev.currentIndex] = isCorrect;

        return {
          ...prev,
          score: isCorrect ? prev.score + 1 : prev.score,
          answers: newAnswers,
          currentIndex: isLastQuestion ? prev.currentIndex : prev.currentIndex + 1,
          isComplete: isLastQuestion,
        };
      });

      if (isLastQuestion) {
        playComplete();
      }

      setSelectedAnswer(null);
      setHintedAnswer(null);
      setIsAnswering(false);
      setShowCorrectAnimation(false);
    }, isCorrect ? 1500 : 1000);
  };

  const handleHint = () => {
    if (!currentQuestion || hintedAnswer !== null) return;

    playHint();
    setHintedAnswer(currentQuestion.answer);
    setGameState((prev) => prev ? { ...prev, hintsUsed: prev.hintsUsed + 1 } : null);

    setTimeout(() => {
      setHintedAnswer(null);
    }, 2000);
  };

  const handlePlayAgain = () => {
    playClick();
    initGame();
  };

  const handleMainMenu = () => {
    playClick();
    router.push('/');
  };

  if (!gameState || !currentQuestion) {
    return (
      <PaperBackground className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-[#4A3728]">{t('game.loading')}</div>
      </PaperBackground>
    );
  }

  if (gameState.isComplete) {
    return (
      <PaperBackground className="min-h-screen">
        <ResultsScreen
          score={gameState.score}
          total={QUICK_START_QUESTIONS}
          onPlayAgain={handlePlayAgain}
          onMainMenu={handleMainMenu}
        />
      </PaperBackground>
    );
  }

  return (
    <PaperBackground className="min-h-screen flex flex-col">
      <Confetti show={showCorrectAnimation} />

      <GameHeader confirmExit>
        <ScoreBoard
          current={gameState.currentIndex + 1}
          total={QUICK_START_QUESTIONS}
          score={gameState.score}
        />
      </GameHeader>

      <main className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <div className="mb-4">
          <Question question={currentQuestion} />
        </div>

        <AnswerGrid
          options={currentQuestion.options}
          correctAnswer={currentQuestion.answer}
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
    </PaperBackground>
  );
}

export default function QuickStartPage() {
  const t = useTranslations();

  return (
    <Suspense fallback={
      <PaperBackground className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-[#4A3728]">{t('game.loading')}</div>
      </PaperBackground>
    }>
      <QuickStartContent />
    </Suspense>
  );
}
