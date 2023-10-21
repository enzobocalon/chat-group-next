import { Input } from '@/components/Input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import ChatList from './ChatList';

export default function DefaultSidebar() {
  return (
    <>
      <Input placeholder="Search by chat id...">
        <MagnifyingGlassIcon className="w-6 h-6" />
      </Input>

      <div className="flex flex-col gap-7 mt-6">
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
      </div>
    </>
  );
}
