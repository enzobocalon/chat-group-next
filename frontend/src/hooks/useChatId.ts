import { usePathname } from 'next/navigation';

export function useChatId() {
  const pathname = usePathname();

  return pathname.split('/')[2];
}
