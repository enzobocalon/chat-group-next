'use client';

import { cn } from '@/utils/cn';
import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  children?: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'w-full bg-[#2F80ED] p-4 rounded-lg text-white hover:opacity-95 transition-all',
        className
      )}
    >
      {children}
    </button>
  );
}
