'use client';
import UserCard from '@/components/UserCard';
import { useChatId } from '@/hooks/useChatId';
import { roomsService } from '@/services/rooms';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

export default function MembersList() {
  const roomId = useChatId();
  const { data, isLoading } = useQuery({
    queryKey: ['members', roomId],
    queryFn: async () => {
      return roomsService.getMembers(roomId);
    },
    staleTime: 1000 * 60 * 60 * 15,
  });
  return (
    <div className="text-white flex-1 mt-4 font-bold overflow-y-auto">
      <h2>MEMBERS</h2>
      {isLoading ? (
        <Skeleton count={14} height={36} className="my-1" />
      ) : (
        <>
          <div className="flex flex-col gap-7 mt-6">
            {data && data.map((user) => <UserCard key={user.id} user={user} />)}
          </div>
        </>
      )}
    </div>
  );
}
