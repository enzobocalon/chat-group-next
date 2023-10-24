'use client';

import { cn } from '@/utils/cn';
import { ComponentProps, forwardRef } from 'react';

interface InputProps extends ComponentProps<'textarea'> {
  children?: React.ReactNode;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ children, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-1 flex-col">
        <div className="bg-[#3C393F] rounded-lg flex flex-1 items-center px-2">
          <textarea
            {...props}
            className={cn(
              'w-full resize-none bg-transparent outline-none px-2 py-4 text-[14px] flex-1 text-white',
              className
            )}
            ref={ref}
          />
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
