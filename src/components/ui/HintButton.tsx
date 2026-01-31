'use client';

import { useTranslations } from 'next-intl';

interface HintButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function HintButton({ onClick, disabled = false }: HintButtonProps) {
  const t = useTranslations();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        btn-bounce
        flex items-center justify-center
        w-16 h-16
        rounded-full
        bg-[#FFD93D] hover:bg-[#ECC82C]
        text-[#4A3728]
        shadow-lg
        transition-all
        ${disabled ? 'opacity-50 cursor-not-allowed transform-none' : 'cursor-pointer'}
      `}
      aria-label={t('hint.get')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10"
      >
        <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zm2 15h-4v-1h4v1zm0-3H9.87a6.98 6.98 0 01-1.87-4c0-2.76 2.24-5 5-5s5 2.24 5 5a6.98 6.98 0 01-1.87 4H14v1zM9 20h6a1 1 0 010 2H9a1 1 0 010-2z" />
      </svg>
    </button>
  );
}
