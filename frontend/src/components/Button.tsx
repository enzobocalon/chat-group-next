'use client';

import { cn } from '@/utils/cn';
import { ComponentProps } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
  children?: React.ReactNode;
}

export default function Button({
  children,
  isLoading,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={cn(
        'w-full flex items-center justify-center bg-[#2F80ED] p-4 rounded-lg text-white hover:opacity-95 transition-all disabled:bg-[#CED4DA] disabled:cursor-not-allowed',
        className
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="text-app" />}
    </button>
  );
}
