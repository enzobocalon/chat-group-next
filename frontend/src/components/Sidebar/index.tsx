'use client';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import UserCard from '../UserCard';
import CurrentChatSidebar from './components/CurrentChatSidebar';
import TopMenu from './components/TopMenu';
import DefaultSidebar from './components/DefaultSidebar';
import { useCallback, useState } from 'react';
import { IUser } from '@/types/User';
import Actions from './components/Actions';
import { IRoom } from '@/types/Room';
import { useQuery } from '@tanstack/react-query';
import { roomsService } from '@/services/rooms';

interface Props {
  user: IUser;
}

export default function Sidebar({ user }: Props) {
  const [isChatActive, setIsChatActive] = useState(false);
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const handleAddRoom = useCallback((room: IRoom) => {
    setRooms((prev) => [...prev, room]);
  }, []);

  useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await roomsService.get();
      setRooms(response);
      return response;
    },
    staleTime: 1000 * 60 * 60 * 15,
  });

  const handleSidebarStatus = useCallback(() => {
    if (!isChatActive) return;
    setIsChatActive((prev) => !prev);
  }, [isChatActive]);

  return (
    <aside className="flex flex-col max-w-sm w-full bg-app-background">
      <TopMenu
        hasChat={isChatActive}
        onToggle={handleSidebarStatus}
        onCreate={handleAddRoom}
      />
      <div className="p-8 text-white flex flex-col flex-1">
        {isChatActive ? (
          <CurrentChatSidebar />
        ) : (
          <DefaultSidebar rooms={rooms} />
        )}
      </div>

      <div className="bg-app-foreground flex items-center justify-center p-4">
        <UserCard user={user} />
        <Actions />
      </div>
    </aside>
  );
}
