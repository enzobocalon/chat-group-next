'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '@/services/users';
import { APP_CONFIG } from '@/config';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const cookies = useCookies();
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const hasToken = cookies.get(APP_CONFIG.ACCESS_TOKEN);
    return !!hasToken;
  });
  const router = useRouter();

  const { isError, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback(
    (accessToken: string) => {
      cookies.set(APP_CONFIG.ACCESS_TOKEN, accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        path: '/',
        sameSite: 'strict',
      });
      setSignedIn(true);
      router.replace('/chat');
    },
    [cookies, router]
  );

  const signout = useCallback(() => {
    cookies.remove(APP_CONFIG.ACCESS_TOKEN);
    setSignedIn(false);
    router.replace('/');
  }, [cookies, router]);

  useEffect(() => {
    if (isError) {
      signout();
    }
  }, [isError, signout]);
  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
