import MembersList from './MembersList';
import { useQuery } from '@tanstack/react-query';
import { roomsService } from '@/services/rooms';
import { usePathname } from 'next/navigation';

export default function CurrentChatSidebar() {
  const pathname = usePathname();
  const { data } = useQuery({
    queryKey: ['rooms', pathname.split('/')[2]],
    queryFn: async () => {
      return roomsService.getById(pathname.split('/')[2]);
    },
    staleTime: 1000 * 60 * 60 * 15,
  });

  return (
    <>
      <h1 className="font-bold">{data?.name}</h1>
      {data?.description && (
        <p className="text-base mt-6">{data?.description}</p>
      )}
      <MembersList />
    </>
  );
}
