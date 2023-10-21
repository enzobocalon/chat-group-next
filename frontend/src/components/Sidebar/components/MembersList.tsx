'use client';

import UserCard from '@/components/UserCard';

export default function MembersList() {
  return (
    <div className="text-white flex-1 mt-10 font-bold">
      <h2>MEMBERS</h2>
      <div className="flex flex-col gap-7 mt-6">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
}
