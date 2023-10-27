'use client';

import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { CookiesProvider } from 'next-client-cookies';
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from '@/context/SocketContext';
import { SkeletonTheme } from 'react-loading-skeleton';

interface ProvidersProps {
  children: ReactNode;
  cookies: RequestCookie[];
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const Providers: FC<ProvidersProps> = ({ children, cookies }) => {
  return (
    <CookiesProvider value={cookies}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AuthProvider>
          <SocketProvider>
            <SkeletonTheme baseColor="#202020" highlightColor="#252329">
              {children}
            </SkeletonTheme>
          </SocketProvider>
        </AuthProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default Providers;
