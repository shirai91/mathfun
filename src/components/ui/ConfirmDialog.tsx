'use client';

import { useEffect } from 'react';
import Button from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Yes',
  cancelText = 'No',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="modal-overlay absolute inset-0"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="animate-bounce-in relative bg-[#FFF8E7] rounded-3xl p-8 shadow-2xl max-w-md w-full border-4 border-[#4A3728]/10">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#4A3728] mb-4">
          {title}
        </h2>

        {/* Message */}
        <p className="text-xl text-center text-[#6B5744] mb-8">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            variant="pink"
            size="lg"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button
            variant="green"
            size="lg"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
