'use client';

import { AccountCircle } from '@/components/Icons/AccountCircle';
import { Mountain } from '@/components/Icons/Mountain';
import Separator from '@/components/Separator';
import { ChevronDownIcon, ExitIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useAuth } from '@/hooks/useAuth';
import { useClickOutside } from '@/hooks/useClickOutside';

export default function Actions() {
  const [isOpen, setIsOpen] = useState(false);
  const clickOutside = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
  const { signout } = useAuth();
  return (
    <div className="relative w-full flex items-center justify-end">
      <div className="flex items-center justify-center">
        <ChevronDownIcon
          className={cn(
            'w-6 h-6 text-white cursor-pointer transition-all',
            isOpen && 'rotate-180'
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, type: 'fade' }}
            className="flex text-white flex-col gap-2 bg-app px-3 py-4 absolute bottom-8 right-0 rounded-xl"
            ref={clickOutside}
          >
            <div className="hover:bg-[#3C393F] w-full shadow-2md flex items-center gap-2 p-2 rounded-lg cursor-pointer">
              <AccountCircle />
              <span>My Profile</span>
            </div>
            <div className="hover:bg-[#3C393F] w-full shadow-2md flex items-center gap-2 p-2 rounded-lg cursor-pointer">
              <Mountain />
              <span>Tweeter</span>
            </div>

            <Separator className="lg: min-w-[164px]" />

            <div
              onClick={signout}
              className="hover:bg-[#3C393F] text-[#EB5757] w-full shadow-2md flex items-center gap-2 p-2 rounded-lg cursor-pointer"
            >
              <ExitIcon />
              <span>Logout</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
