import Sidebar from '@/components/Sidebar';
import { headers } from 'next/headers';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const headersList = headers();
  const user = JSON.parse(headersList.get('X-User') as string);

  return (
    <div className="flex w-full h-screen">
      <Sidebar user={user} />
      {children}
    </div>
  );
}
