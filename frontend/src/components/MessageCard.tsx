import Image from 'next/image';
import placeholderImg from '../assets/userPlaceholder.png';
import { IMessage } from '@/types/Message';

interface MessageCardProps {
  message: IMessage;
}

export default function MessageCard({ message }: MessageCardProps) {
  return (
    <div className="flex gap-7">
      <Image
        src={placeholderImg}
        alt="imagePlaceholder"
        className="max-w-[42px] max-h-[42px]"
      />
      <div className="flex flex-col">
        <div className="flex gap-4  text-[#828282] items-center">
          <strong className="text-[18px] tracking-[-0.63px]">
            {message.user.name}
          </strong>
          <span className="tracking-[-0.49px] text-[14px]">
            yesterday at 2:29pm
          </span>
        </div>

        <p>{message.content}</p>
      </div>
    </div>
  );
}
