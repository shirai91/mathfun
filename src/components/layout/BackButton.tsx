'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ConfirmDialog from '../ui/ConfirmDialog';

interface BackButtonProps {
  confirmExit?: boolean;
}

export default function BackButton({
  confirmExit = false,
}: BackButtonProps) {
  const router = useRouter();
  const t = useTranslations();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (confirmExit) {
      setShowConfirm(true);
    } else {
      router.push('/');
    }
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    router.push('/');
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="btn-bounce flex items-center justify-center w-14 h-14 rounded-full bg-[#FF9F43] hover:bg-[#E88E32] text-white shadow-lg transition-all"
        aria-label={t('backButton.ariaLabel')}
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

      <ConfirmDialog
        isOpen={showConfirm}
        title={t('backButton.title')}
        message={t('backButton.message')}
        confirmText={t('backButton.confirm')}
        cancelText={t('backButton.cancel')}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
