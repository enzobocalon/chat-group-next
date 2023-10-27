import ChatList from './ChatList';
import { IRoom } from '@/types/Room';
import Search from './Search';
import { useCallback, useMemo, useState } from 'react';
import SearchedRooms from './SearchedRooms';
import { isUUID } from '@/utils/isUUID';
import Skeleton from 'react-loading-skeleton';

interface DefaultSidebarProps {
  rooms: IRoom[] | undefined;
  isLoading: boolean;
}

export default function DefaultSidebar({
  rooms,
  isLoading,
}: DefaultSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = useCallback((searchContent: string | undefined) => {
    if (!searchContent) {
      setSearchTerm('');
      return;
    }
    setSearchTerm(searchContent);
  }, []);

  const filteredRooms = useMemo(() => {
    if (!rooms) return [];
    return rooms.filter((room) =>
      room[isUUID(searchTerm) ? 'id' : 'name']
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [rooms, searchTerm]);

  return (
    <>
      <Search onSearch={handleSearch} />

      {searchTerm ? (
        <SearchedRooms term={searchTerm} filteredRooms={filteredRooms} />
      ) : isLoading ? (
        <div className="mt-6">
          <Skeleton count={14} height={36} className="my-1" />
        </div>
      ) : (
        <div className="flex flex-col gap-7 mt-6">
          {rooms && rooms.map((room) => <ChatList key={room.id} room={room} />)}
        </div>
      )}
    </>
  );
}
