'use client';

import Separator from '@/components/Separator';
import { IRoom } from '@/types/Room';

interface SearchedRoomsProps {
  term: string;
  filteredRooms: IRoom[];
}

export default function SearchedRooms({
  term,
  filteredRooms,
}: SearchedRoomsProps) {
  return (
    <div>
      <div>
        <p>My Channels</p>
      </div>

      <Separator />

      <div>
        <p>Found Rooms</p>
      </div>
    </div>
  );
}
