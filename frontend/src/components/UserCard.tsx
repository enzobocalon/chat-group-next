import Image from 'next/image';
import placeholderImg from '../assets/userPlaceholder.png';
import { IUser } from '@/types/User';

interface UserCardProps {
  user: IUser;
}

export default function UserCard({ user }: UserCardProps) {
  console.log(user);
  return (
    <div className="flex text-white items-center w-full gap-7">
      <Image
        src={placeholderImg}
        alt="imagePlaceholder"
        className="max-w-[42px] max-h-[42px]"
      />
      <span>{user.name}</span>
    </div>
  );
}
