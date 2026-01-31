'use client';

import { ReactNode } from 'react';
import BackButton from './BackButton';

interface GameHeaderProps {
  children?: ReactNode;
  confirmExit?: boolean;
}

export default function GameHeader({ children, confirmExit = true }: GameHeaderProps) {
  return (
    <header className="flex items-center justify-between p-4">
      <BackButton confirmExit={confirmExit} />
      <div className="flex-1 flex justify-center">
        {children}
      </div>
      <div className="w-14" /> {/* Spacer to balance the header */}
    </header>
  );
}
