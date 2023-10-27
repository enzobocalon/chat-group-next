import Skeleton from 'react-loading-skeleton';
import MembersList from './MembersList';
import useRoom from '@/hooks/useRoom';

export default function CurrentChatSidebar() {
  const { data, isLoading } = useRoom();

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton height={40} />
        </>
      ) : (
        <>
          <h1 className="font-bold">{data?.name}</h1>
          {data?.description && (
            <p className="text-base mt-6">{data?.description}</p>
          )}
        </>
      )}
      <MembersList />
    </>
  );
}
