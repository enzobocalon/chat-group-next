import { useQuery } from '@tanstack/react-query';
import { useChatId } from './useChatId';
import { roomsService } from '@/services/rooms';

export default function useRoom() {
  const roomId = useChatId();
  const { data } = useQuery({
    queryKey: ['rooms', roomId],
    queryFn: async () => {
      return roomsService.getById(roomId);
    },
    staleTime: 1000 * 60 * 60 * 15,
  });

  return {
    roomId,
    data,
  };
}
