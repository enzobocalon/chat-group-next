import Skeleton from 'react-loading-skeleton';

export default function MessageLoader() {
  return (
    <div className="flex gap-7 w-full">
      <div className="max-w-[42px] max-h-[42px]">
        <Skeleton width={42} height={42} />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-4  text-[#828282] items-center">
          <strong className="text-[18px] tracking-[-0.63px]">
            <Skeleton width={150} />
          </strong>
          <span className="tracking-[-0.49px] text-[14px]">
            <Skeleton width={100} />
          </span>
        </div>

        <Skeleton width={'100%'} height={40} />
      </div>
    </div>
  );
}
