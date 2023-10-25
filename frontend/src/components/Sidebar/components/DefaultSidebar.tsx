import { Input } from '@/components/Input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import ChatList from './ChatList';
import { IRoom } from '@/types/Room';

interface DefaultSidebarProps {
  rooms: IRoom[];
}

export default function DefaultSidebar({ rooms }: DefaultSidebarProps) {
  return (
    <>
      <Input placeholder="Search by chat id...">
        <MagnifyingGlassIcon className="w-6 h-6" />
      </Input>

      <div className="flex flex-col gap-7 mt-6">
        {rooms && rooms.map((room) => <ChatList key={room.id} />)}
      </div>
    </>
  );
}
