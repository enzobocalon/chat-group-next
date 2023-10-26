'use client';

import Separator from '@/components/Separator';
import { IRoom } from '@/types/Room';
import ChatList from './ChatList';
import { useMemo } from 'react';
import { isUUID } from '@/utils/isUUID';
import { useQuery } from '@tanstack/react-query';
import { roomsService } from '@/services/rooms';

interface SearchedRoomsProps {
  term: string;
  filteredRooms: IRoom[];
}

export default function SearchedRooms({
  term,
  filteredRooms,
}: SearchedRoomsProps) {
  const isIdTerm = useMemo(() => {
    return isUUID(term);
  }, [term]);

  const { data } = useQuery({
    queryKey: ['find-room', term],
    queryFn: async () => {
      if (isIdTerm) {
        return roomsService.getById(term);
      }
      return roomsService.getByName(term);
    },
    staleTime: 1000 * 60 * 60,
    enabled: isIdTerm
      ? !filteredRooms.filter((room) => room.id === term)
      : true,
  });

  return (
    <div className="mt-6 ">
      {filteredRooms.length > 0 && (
        <div className="flex flex-col gap-4">
          <p>My Channels</p>
          <div className="flex flex-col gap-4">
            {filteredRooms.map((room) => (
              <ChatList key={room.id} room={room} />
            ))}
          </div>
        </div>
      )}

      {data && (
        <>
          <Separator className="my-4" />
          <div className="overflow-y-auto flex flex-col gap-4">
            <p>Found Rooms</p>
            <div className="flex flex-col gap-4">
              {Array.isArray(data) ? (
                data.map((room) => (
                  <ChatList key={room.id} room={room} openPrompt />
                ))
              ) : (
                <ChatList key={data.id} room={data} openPrompt />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
