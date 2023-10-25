'use client';
import UserCard from '@/components/UserCard';
import { roomsService } from '@/services/rooms';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export default function MembersList() {
  const pathname = usePathname();
  const { data } = useQuery({
    queryKey: ['members', pathname.split('/')[2]],
    queryFn: async () => {
      return roomsService.getMembers(pathname.split('/')[2]);
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
