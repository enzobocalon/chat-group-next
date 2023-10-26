import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
  autoConnect: false,
  transports: ['websocket'],
  reconnectionDelayMax: 10000,
  reconnectionAttempts: 10,
});

socket.on('connect', () => {
  console.log('Connected');
});
