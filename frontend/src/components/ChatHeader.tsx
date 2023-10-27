import Skeleton from 'react-loading-skeleton';

interface ChatHeaderProps {
  name: string | undefined;
}

export default function ChatHeader({ name }: ChatHeaderProps) {
  return (
    <main className="w-full flex gap-4 items-center bg-app p-4 cursor-pointer shadow-3xl">
      {name ? (
        <span className="text-white font-bold tracking-[-0.63px]">{name}</span>
      ) : (
        <Skeleton containerClassName="w-full" width={'100%'} height={24} />
      )}
    </main>
  );
}
