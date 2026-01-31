'use client';

import { ReactNode } from 'react';

interface PaperBackgroundProps {
  children: ReactNode;
  className?: string;
}

export default function PaperBackground({ children, className = '' }: PaperBackgroundProps) {
  return (
    <div className={`paper-texture min-h-screen w-full ${className}`}>
      {children}
    </div>
  );
}
