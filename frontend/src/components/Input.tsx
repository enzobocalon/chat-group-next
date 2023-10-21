'use client';

import { cn } from '@/utils/cn';
import { ComponentProps, forwardRef } from 'react';

interface InputProps extends ComponentProps<'input'> {
  children?: React.ReactNode;
  isIconButton?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, isIconButton, className, ...props }, ref) => {
    return (
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
    );
  }
);

Input.displayName = 'Input';
