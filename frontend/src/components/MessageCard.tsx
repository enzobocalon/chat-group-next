import Image from 'next/image';
import placeholderImg from '../assets/userPlaceholder.png';
import { IMessage } from '@/types/Message';
import { dateFormat } from '@/utils/dateFormat';
import { IRoom } from '@/types/Room';
import { useAuth } from '@/hooks/useAuth';
import MessageActions from './MessageActions';
import { useState } from 'react';

interface MessageCardProps {
  message: IMessage;
  room?: IRoom;
}

export default function MessageCard({ message, room }: MessageCardProps) {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const canBeDeleted =
    user?.id === message.user.id || room?.ownerId === user?.id;
  function toggleDropdown() {
    setIsDropdownOpen((prev) => !prev);
  }

  return (
    <div className="flex gap-7 relative group">
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
            {dateFormat(message.createdAt)}
          </span>
        </div>

        <p>{message.content}</p>
      </div>

      {canBeDeleted && (
        <MessageActions
          isOpen={isDropdownOpen}
          onToggle={toggleDropdown}
          id={message.id}
        />
      )}
    </div>
  );
}
