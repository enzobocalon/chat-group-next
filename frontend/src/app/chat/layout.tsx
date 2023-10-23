import Sidebar from '@/components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      {children}
    </div>
  );
}