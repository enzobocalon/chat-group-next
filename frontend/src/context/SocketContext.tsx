import { ReactNode, createContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { socket as SocketConfig } from '@/lib/socket';

interface SocketContextValue {
  socket: Socket | null;
}

export const SocketContext = createContext({} as SocketContextValue);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    setSocket(SocketConfig);
    socket?.connect();
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
