'use client';

import { Input } from '@/components/Input';
import Modal from '@/components/Modal';
import { Textarea } from '@/components/Textarea';
import { ChevronLeftIcon, PlusIcon } from '@radix-ui/react-icons';
import { useCallback, useState } from 'react';

interface Props {
  hasChat: boolean;
  onToggle: () => void;
}

export default function TopMenu({ hasChat, onToggle }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalStatus = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

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
            <PlusIcon className="w-6 h-6 flex-1" onClick={toggleModalStatus} />
          </div>
        </div>
      )}
      <Modal
        title="New Channel"
        onConfirm={() => console.log('teste')}
        isOpen={isModalOpen}
        onClose={toggleModalStatus}
        className="w-full flex flex-col h-full max-w-[656px] max-h-[360px]"
      >
        <form className="flex flex-col flex-1 gap-4">
          <Input placeholder="Channel name" />
          <Textarea
            placeholder="Channel Description"
            className="flex-1 h-full"
          />
        </form>
      </Modal>
    </div>
  );
}
