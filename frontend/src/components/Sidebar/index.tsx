'use client';

import UserCard from '../UserCard';
import CurrentChatSidebar from './components/CurrentChatSidebar';
import TopMenu from './components/TopMenu';
import DefaultSidebar from './components/DefaultSidebar';
import { useCallback, useEffect, useState } from 'react';
import { IUser } from '@/types/User';
import Actions from './components/Actions';
import { useQuery } from '@tanstack/react-query';
import { roomsService } from '@/services/rooms';
import { usePathname } from 'next/navigation';

interface Props {
  user: IUser;
}

export default function Sidebar({ user }: Props) {
  const [isChatActive, setIsChatActive] = useState(false);
  const pathname = usePathname();

  const { data } = useQuery({
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
    if (pathname.split('/')[2]) {
      setIsChatActive(true);
    }
  }, [pathname]);

  return (
    <aside className="flex flex-col max-w-sm w-full bg-app-background">
      <TopMenu hasChat={isChatActive} onToggle={handleSidebarStatus} />
      <div className="p-8 text-white flex flex-col flex-1">
        {isChatActive ? (
          <CurrentChatSidebar />
        ) : (
          <DefaultSidebar rooms={data} />
        )}
      </div>

      <div className="bg-app-foreground flex items-center justify-center p-4">
        <UserCard user={user} />
        <Actions />
      </div>
    </aside>
  );
}
