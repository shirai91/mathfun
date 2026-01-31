'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'blue' | 'green' | 'orange' | 'pink' | 'purple' | 'yellow';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  blue: 'bg-[#4ECDC4] hover:bg-[#3DBDB4] text-white',
  green: 'bg-[#7CB342] hover:bg-[#6BA032] text-white',
  orange: 'bg-[#FF9F43] hover:bg-[#E88E32] text-white',
  pink: 'bg-[#FF6B9D] hover:bg-[#E85A8C] text-white',
  purple: 'bg-[#9B59B6] hover:bg-[#8A48A5] text-white',
  yellow: 'bg-[#FFD93D] hover:bg-[#ECC82C] text-[#4A3728]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-lg rounded-xl',
  md: 'px-6 py-3 text-xl rounded-2xl',
  lg: 'px-8 py-4 text-2xl rounded-2xl',
  xl: 'px-10 py-5 text-3xl rounded-3xl',
};

export default function Button({
  children,
  variant = 'blue',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        btn-bounce
        font-bold
        shadow-lg
        transition-all
        duration-150
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed transform-none' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
