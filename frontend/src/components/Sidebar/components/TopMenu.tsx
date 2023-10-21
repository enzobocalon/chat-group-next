'use client';

import { ChevronLeftIcon, PlusIcon } from '@radix-ui/react-icons';

interface Props {
  hasChat: boolean;
  onToggle: () => void;
}

export default function TopMenu({ hasChat, onToggle }: Props) {
  return (
    <div
      className="w-full flex gap-4 items-center bg-app-foreground p-4 cursor-pointer shadow-3xl"
      onClick={onToggle}
    >
      {hasChat && (
        <div className="flex flex-1 w-full items-center">
          <div className="text-white w-8 h-8 flex items-center">
            <ChevronLeftIcon color="white" className="w-6 h-6" />
          </div>
          <span className="text-white font-bold tracking-[-0.63px]">
            All channels
          </span>
        </div>
      )}

      {!hasChat && (
        <div className="flex flex-1 w-full justify-between items-center">
          <span className="text-white font-bold tracking-[-0.63px]">
            Channels
          </span>
          <div className="text-white w-8 h-8 flex items-center justify-between bg-app rounded-lg hover:opacity-75 transition-all">
            <PlusIcon className="w-6 h-6 flex-1" />
          </div>
        </div>
      )}
    </div>
  );
}
