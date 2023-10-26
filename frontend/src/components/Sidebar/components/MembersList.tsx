'use client';
import UserCard from '@/components/UserCard';
import { useChatId } from '@/hooks/useChatId';
import { roomsService } from '@/services/rooms';
import { useQuery } from '@tanstack/react-query';

export default function MembersList() {
  const roomId = useChatId();
  const { data } = useQuery({
    queryKey: ['members', roomId],
    queryFn: async () => {
      return roomsService.getMembers(roomId);
    },
    staleTime: 1000 * 60 * 60 * 15,
  });
  return (
    <div className="text-white flex-1 mt-10 font-bold">
      <h2>MEMBERS</h2>
      <div className="flex flex-col gap-7 mt-6">
        {data && data.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  );
}
