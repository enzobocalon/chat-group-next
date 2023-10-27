import ChatHeader from '@/components/ChatHeader';

export default function Page() {
  return (
    <div className="bg-app w-full text-white flex flex-col">
      <ChatHeader name="Join a room" />
      <div className="px-20 py-10 h-full w-full flex flex-col">
        <div className="flex flex-1 items-center justify-center">
          <p>Join a chat to continue...</p>
        </div>
      </div>
    </div>
  );
}
