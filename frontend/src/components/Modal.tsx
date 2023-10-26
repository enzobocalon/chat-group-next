'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import Portal from './ReactPortal';
import { cn } from '@/utils/cn';

interface ModalProps {
  title: string;
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export default function Modal({
  title,
  onConfirm,
  onClose,
  isOpen,
  label = 'Save',
  isLoading,
  className,
  children,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <motion.div
            onClick={onClose}
            className="absolute top-0 left-0 w-screen h-screen bg-[#120F1380]/50 z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, type: 'fade' }}
          >
            <div
              className={cn(
                'bg-app-background p-4 m-4 text-white rounded-3xl',
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="text-lg mb-6 font-bold tracking-[-0.63px] uppercase text-[#F2F2F2]">
                {title}
              </h1>
              {children}

              <div className="flex items-center justify-end">
                <Button
                  className="mt-4 max-w-[100px] max-h-[40px]"
                  onClick={onConfirm}
                  isLoading={isLoading}
                >
                  {label}
                </Button>
              </div>
            </div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
}
