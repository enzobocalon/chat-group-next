'use client';

import Modal from '@/components/Modal';
import { roomsService } from '@/services/rooms';
import { IRoom } from '@/types/Room';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ChatListProps {
  room: IRoom;
  openPrompt?: boolean;
}

export default function ChatList({ room, openPrompt }: ChatListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  function handleNavigation() {
    router.push(`/chat/${room.id}`);
  }

  function handleModal() {
    setIsModalOpen((prev) => !prev);
  }

  async function handleModalConfirmation() {
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
      handleModal();
    }
  }

  return (
    <>
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={openPrompt ? handleModal : handleNavigation}
      >
        <div className="bg-app w-full max-w-[42px] h-[42px] flex items-center justify-center rounded-lg">
          <strong className="text-[18px]">
            {room.name.substring(0, 2).toUpperCase()}
          </strong>
        </div>
        <strong className="text-[18px] text-[#BDBDBD]">{room.name}</strong>
      </div>
      <Modal
        title="Join Room"
        isOpen={isModalOpen}
        label="Confirm"
        onClose={handleModal}
        onConfirm={handleModalConfirmation}
      >
        <p>Are you sure you want to join the room?</p>
      </Modal>
    </>
  );
}
