'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PaperBackground from '@/components/ui/PaperBackground';
import GameHeader from '@/components/layout/GameHeader';
import Question from '@/components/game/Question';
import AnswerGrid from '@/components/game/AnswerGrid';
import ScoreBoard from '@/components/game/ScoreBoard';
import HintButton from '@/components/ui/HintButton';
import VisualHint from '@/components/game/VisualHint';
import ResultsScreen from '@/components/game/ResultsScreen';
import Confetti from '@/components/game/Confetti';
import LevelUpModal from '@/components/game/LevelUpModal';
import { useSoundContext } from '@/contexts/SoundContext';
import { useLevelContext } from '@/contexts/LevelContext';
import { generateQuestions } from '@/lib/questionGenerator';
import { Question as QuestionType, NumberRange, QuickStartState, Topic } from '@/types';
import { QUICK_START_QUESTIONS, DEFAULT_TOPIC } from '@/lib/constants';

function QuickStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const range = (parseInt(searchParams.get('range') || '10') as NumberRange) || 10;
  const topic = (searchParams.get('topic') as Topic) || DEFAULT_TOPIC;
  const { playCorrect, playWrong, playHint, playComplete, playClick } = useSoundContext();
  const { awardCorrectAnswer, awardCompletionBonus } = useLevelContext();

  const [gameState, setGameState] = useState<QuickStartState | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const completionBonusAwarded = useRef(false);

  const initGame = useCallback(() => {
    const questions = generateQuestions(QUICK_START_QUESTIONS, range, topic);
    setGameState({
      questions,
      currentIndex: 0,
      score: 0,
      answers: new Array(QUICK_START_QUESTIONS).fill(null),
      isComplete: false,
      hintsUsed: 0,
    });
    setSelectedAnswer(null);
    setShowHint(false);
    setIsAnswering(false);
    setShowCorrectAnimation(false);
    setXpEarned(0);
    completionBonusAwarded.current = false;
  }, [range, topic]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const currentQuestion: QuestionType | null = gameState?.questions[gameState.currentIndex] || null;

  const handleAnswer = (answer: number) => {
    if (!gameState || !currentQuestion || isAnswering) return;

    setSelectedAnswer(answer);
    setIsAnswering(true);
    setShowHint(false);

    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      playCorrect();
      setShowCorrectAnimation(true);
      // Award XP for correct answer
      const xp = awardCorrectAnswer();
      setXpEarned((prev) => prev + xp);
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
        // Award completion bonus XP
        if (!completionBonusAwarded.current) {
          completionBonusAwarded.current = true;
          const finalScore = isCorrect ? gameState.score + 1 : gameState.score;
          const bonusXp = awardCompletionBonus(finalScore, QUICK_START_QUESTIONS);
          setXpEarned((prev) => prev + bonusXp);
        }
      }

      setSelectedAnswer(null);
      setShowHint(false);
      setIsAnswering(false);
      setShowCorrectAnimation(false);
    }, isCorrect ? 1500 : 1000);
  };

  const handleHint = () => {
    if (!currentQuestion || showHint) return;

    playHint();
    setShowHint(true);
    setGameState((prev) => prev ? { ...prev, hintsUsed: prev.hintsUsed + 1 } : null);
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
        <LevelUpModal />
        <ResultsScreen
          score={gameState.score}
          total={QUICK_START_QUESTIONS}
          xpEarned={xpEarned}
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

      <main className="flex-1 flex flex-col items-center justify-center gap-6 p-4">
        <div className="mb-2">
          <Question question={currentQuestion} />
        </div>

        <VisualHint question={currentQuestion} show={showHint} />

        <AnswerGrid
          options={currentQuestion.options}
          correctAnswer={currentQuestion.answer}
          selectedAnswer={selectedAnswer}
          onSelect={handleAnswer}
          disabled={isAnswering}
        />
      </main>

      <div className="fixed bottom-6 left-6">
        <HintButton
          onClick={handleHint}
          disabled={isAnswering || showHint}
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
