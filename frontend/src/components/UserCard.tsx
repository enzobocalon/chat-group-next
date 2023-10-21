// 'use client'

import Image from 'next/image';
import placeholderImg from '../assets/userPlaceholder.png';

export default function UserCard() {
  return (
    <div className="flex text-white items-center w-full gap-7">
      <Image
        src={placeholderImg}
        alt="imagePlaceholder"
        className="max-w-[42px] max-h-[42px]"
      />
      <span>Name</span>
    </div>
  );
}
