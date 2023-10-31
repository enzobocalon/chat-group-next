'use client';

import Modal from '@/components/Modal';
import { roomsService } from '@/services/rooms';
import { IRoom } from '@/types/Room';
import { ExitIcon } from '@radix-ui/react-icons';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ChatListProps {
  room: IRoom;
  openPrompt?: boolean;
}

export default function ChatList({ room, openPrompt }: ChatListProps) {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  function handleNavigation() {
    router.push(`/chat/${room.id}`);
  }

  async function handleJoinModalConfirmation() {
    try {
      await roomsService.join(room.id);
      handleNavigation();
    } catch (e: unknown) {
      console.log(e);
      if (
        e instanceof AxiosError &&
        e.response?.data.message === 'User already in room'
      ) {
        handleNavigation();
      }
    } finally {
      setIsJoinModalOpen(false);
    }
  }

  async function handleModalLeaveConfirmation() {
    try {
      await roomsService.leave(room.id);
      queryClient.setQueryData(['rooms'], (prev: IRoom[]) => {
        return prev.filter((r) => r.id !== room.id);
      });
      router.replace('/chat');
    } catch (e) {
      console.log(e);
    } finally {
      setIsLeaveModalOpen(false);
    }
  }

  return (
    <>
      <div className="flex gap-3 items-center cursor-pointer group">
        <div
          className="flex flex-1 items-center gap-3"
          onClick={
            openPrompt
              ? () => setIsJoinModalOpen((prev) => !prev)
              : handleNavigation
          }
        >
          <div className="bg-app w-full max-w-[42px] h-[42px] flex items-center justify-center rounded-lg">
            <strong className="text-[18px]">
              {room.name.substring(0, 2).toUpperCase()}
            </strong>
          </div>
          <strong className="text-[18px] text-[#BDBDBD]">{room.name}</strong>
        </div>
        {!openPrompt && (
          <div
            className="flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-app p-2 rounded-md transition-all"
            onClick={() => {
              setIsLeaveModalOpen(true);
            }}
          >
            <ExitIcon className="text-[#EB5757]" />
          </div>
        )}
      </div>
      <Modal
        title="Join Room"
        isOpen={isJoinModalOpen}
        label="Confirm"
        onClose={() => setIsJoinModalOpen(false)}
        onConfirm={handleJoinModalConfirmation}
      >
        <p>Are you sure you want to join this room?</p>
      </Modal>

      <Modal
        title="Leave Room"
        isOpen={isLeaveModalOpen}
        label="Confirm"
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={handleModalLeaveConfirmation}
      >
        <p>Are you sure you want to leave this room?</p>
      </Modal>
    </>
  );
}
