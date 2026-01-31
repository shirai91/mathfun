'use client';

import { Question as QuestionType } from '@/types';

interface QuestionProps {
  question: QuestionType;
}

function QuestionBox({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <span className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[#FFD93D] rounded-xl text-4xl md:text-5xl font-black text-[#4A3728] shadow-md">
        ?
      </span>
    );
  }
  return (
    <span className="text-5xl md:text-6xl font-black text-[#4A3728]">
      {value}
    </span>
  );
}

function OperationSymbol({ operation }: { operation: '+' | '-' }) {
  const color = operation === '+' ? 'text-[#7CB342]' : 'text-[#FF6B9D]';
  return (
    <span className={`text-5xl md:text-6xl font-black ${color}`}>
      {operation}
    </span>
  );
}

function HorizontalQuestion({ question }: QuestionProps) {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
      <QuestionBox value={question.operand1} />
      <OperationSymbol operation={question.operation} />
      <QuestionBox value={question.operand2} />
      <span className="text-5xl md:text-6xl font-black text-[#4A3728]">=</span>
      <QuestionBox value={question.result} />
    </div>
  );
}

function VerticalQuestion({ question }: QuestionProps) {
  return (
    <div className="flex flex-col items-end">
      {/* First operand */}
      <div className="text-5xl md:text-6xl font-black text-[#4A3728]">
        {question.operand1 === null ? (
          <span className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[#FFD93D] rounded-xl text-4xl md:text-5xl shadow-md">
            ?
          </span>
        ) : (
          question.operand1
        )}
      </div>

      {/* Second operand with operation */}
      <div className="flex items-center gap-4">
        <OperationSymbol operation={question.operation} />
        <span className="text-5xl md:text-6xl font-black text-[#4A3728]">
          {question.operand2 === null ? (
            <span className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[#FFD93D] rounded-xl text-4xl md:text-5xl shadow-md">
              ?
            </span>
          ) : (
            question.operand2
          )}
        </span>
      </div>

      {/* Divider line */}
      <div className="w-full h-1 bg-[#4A3728] rounded my-2" />

      {/* Result */}
      <div className="text-5xl md:text-6xl font-black text-[#4A3728]">
        {question.result === null ? (
          <span className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[#FFD93D] rounded-xl text-4xl md:text-5xl shadow-md">
            ?
          </span>
        ) : (
          question.result
        )}
      </div>
    </div>
  );
}

export default function Question({ question }: QuestionProps) {
  return (
    <div className="animate-bounce-in">
      {question.format === 'horizontal' ? (
        <HorizontalQuestion question={question} />
      ) : (
        <VerticalQuestion question={question} />
      )}
    </div>
  );
}
