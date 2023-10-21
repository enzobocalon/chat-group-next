import ChatHeader from '@/components/ChatHeader';
import { Input } from '@/components/Input';
import MessageCard from '@/components/MessageCard';

import { PaperPlaneIcon } from '@radix-ui/react-icons';

export default function Page() {
  return (
    <div className="bg-app w-full text-white flex flex-col">
      <ChatHeader />
      <div className="px-20 py-10 h-full w-full flex flex-col">
        <div className="w-full h-full flex-1">
          <MessageCard />
        </div>

        <Input isIconButton placeholder="Type a message here...">
          <PaperPlaneIcon />
        </Input>
      </div>
    </div>
  );
}
