'use client';

import { cn } from '@/utils/cn';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef } from 'react';

interface InputProps extends ComponentProps<'input'> {
  children?: React.ReactNode;
  isIconButton?: boolean;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, isIconButton, error, className, ...props }, ref) => {
    return (
      <div>
        <div className="bg-[#3C393F] rounded-lg flex items-center px-2">
          {children && !isIconButton && <>{children}</>}
          <input
            {...props}
            className={cn(
              'w-full bg-transparent outline-none p-4 text-[14px] flex-1 text-white',
              className
            )}
            ref={ref}
          />
          {children && isIconButton && (
            <button className="bg-[#2F80ED] p-3 rounded-lg">{children}</button>
          )}
        </div>
        {error && (
          <div className="flex gap-2 items-center mt-2 text-[#C92A2A]">
            <CrossCircledIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
