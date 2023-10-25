import ChatList from './ChatList';
import { IRoom } from '@/types/Room';
import Search from './Search';
import { useCallback, useMemo, useState } from 'react';
import SearchedRooms from './SearchedRooms';

interface DefaultSidebarProps {
  rooms: IRoom[] | undefined;
}

export default function DefaultSidebar({ rooms }: DefaultSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = useCallback((searchContent: string | undefined) => {
    if (!searchContent) return;
    setSearchTerm(searchContent);
  }, []);

  const filteredRooms = useMemo(() => {
    if (!rooms) return [];
    return rooms.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [rooms, searchTerm]);

  return (
    <>
      <Search onSearch={handleSearch} />

      {searchTerm ? (
        <SearchedRooms term={searchTerm} filteredRooms={filteredRooms} />
      ) : (
        <div className="flex flex-col gap-7 mt-6">
          {rooms && rooms.map((room) => <ChatList key={room.id} room={room} />)}
        </div>
      )}
    </>
  );
}
