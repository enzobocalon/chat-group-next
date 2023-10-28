import { useClickOutside } from '@/hooks/useClickOutside';
import { DotsHorizontalIcon, TrashIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';

interface MessageActionsProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MessageActions({
  isOpen,
  onToggle,
}: MessageActionsProps) {
  const clickOutsideRef = useClickOutside<HTMLDivElement>(onToggle);
  return (
    <div className="absolute right-0 top-0">
      <div
        className="flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all"
        onClick={onToggle}
      >
        <DotsHorizontalIcon />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, type: 'fade' }}
            className="flex text-white flex-col gap-2 bg-app-background px-4 py-2 absolute top-6 right-0 rounded-xl"
            ref={clickOutsideRef}
          >
            <div className="hover:bg-[#3C393F] text-[#EB5757] w-full shadow-2md flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer">
              <TrashIcon />
              <span>Delete</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
