'use client';

import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { CookiesProvider } from 'next-client-cookies';

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
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
};

export default Providers;
