'use client';

import UserCard from '../UserCard';
import CurrentChatSidebar from './components/CurrentChatSidebar';
import TopMenu from './components/TopMenu';
import DefaultSidebar from './components/DefaultSidebar';
import { useCallback, useEffect, useState } from 'react';
import { IUser } from '@/types/User';
import Actions from './components/Actions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { roomsService } from '@/services/rooms';
import { useChatId } from '@/hooks/useChatId';
import { useSocket } from '@/hooks/useSocket';
import { IRoom } from '@/types/Room';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
  user: IUser;
}

export default function Sidebar({ user }: Props) {
  const [isChatActive, setIsChatActive] = useState(false);
  const roomId = useChatId();
  const queryClient = useQueryClient();
  const { socket } = useSocket();
  const chatId = useChatId();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      return roomsService.get();
    },
    staleTime: 1000 * 60 * 60 * 15,
  });

  const handleSidebarStatus = useCallback(() => {
    if (!isChatActive) return;
    setIsChatActive((prev) => !prev);
  }, [isChatActive]);

  useEffect(() => {
    if (roomId) {
      setIsChatActive(true);
    }
  }, [roomId]);

  useEffect(() => {
    socket?.on('deleteRoom', (deletedRoomId: string) => {
      queryClient.setQueryData(['rooms'], (oldRooms: IRoom[]) => {
        return oldRooms.filter((room: IRoom) => room.id !== deletedRoomId);
      });
      if (chatId && chatId === deletedRoomId) {
        toast.error('This room has been deleted');
        setIsChatActive(false);
        router.replace('/chat');
      }
    });

    return () => {
      socket?.off('deleteRoom');
    };
  }, [socket, queryClient, chatId, router]);

  return (
    <aside className="flex flex-col max-w-sm w-full bg-app-background">
      <TopMenu hasChat={isChatActive} onToggle={handleSidebarStatus} />
      <div className="p-8 text-white flex flex-col flex-1 w-full">
        {isChatActive ? (
          <CurrentChatSidebar />
        ) : (
          <DefaultSidebar rooms={data} isLoading={isLoading} />
        )}
      </div>

      <div className="bg-app-foreground flex items-center justify-center p-4">
        <UserCard user={user} />
        <Actions />
      </div>
    </aside>
  );
}
