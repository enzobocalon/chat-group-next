'use client';

import { IRoom } from '@/types/Room';
import { useRouter } from 'next/navigation';

interface ChatListProps {
  room: IRoom;
}

export default function ChatList({ room }: ChatListProps) {
  const router = useRouter();

  function handleNavigation() {
    router.push(`/chat/${room.id}`);
  }

  return (
    <div
      className="flex gap-3 items-center cursor-pointer"
      onClick={handleNavigation}
    >
      <div className="bg-app w-full max-w-[42px] h-[42px] flex items-center justify-center rounded-lg">
        <strong className="text-[18px]">
          {room.name.substring(0, 2).toUpperCase()}
        </strong>
      </div>
      <strong className="text-[18px] text-[#BDBDBD]">{room.name}</strong>
    </div>
  );
}
