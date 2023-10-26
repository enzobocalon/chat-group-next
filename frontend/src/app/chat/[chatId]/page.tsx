'use client';

import ChatHeader from '@/components/ChatHeader';
import { Input } from '@/components/Input';
import MessageCard from '@/components/MessageCard';
import useRoom from '@/hooks/useRoom';
import { useSocket } from '@/hooks/useSocket';
import { messagesService } from '@/services/messages';
import { IMessage } from '@/types/Message';

import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef, KeyboardEvent, useEffect } from 'react';

export default function Page() {
  const inputValue = useRef<HTMLInputElement | null>(null);
  const { data, roomId } = useRoom();
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  const { data: messages } = useQuery({
    queryKey: ['messages', roomId],
    queryFn: async () => {
      return messagesService.get(roomId);
    },
    staleTime: Infinity,
  });

  const addNewMessage = useCallback(
    (value: IMessage) => {
      queryClient.setQueryData(['messages', roomId], (prev: IMessage[]) => {
        return [...prev, value];
      });
    },
    [queryClient, roomId]
  );

  const { mutateAsync } = useMutation({
    mutationKey: ['create-message', roomId],
    mutationFn: async () => {
      if (!inputValue.current) return;
      return messagesService.create(roomId, inputValue.current.value);
    },
  });

  const createMessage = useCallback(
    async (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;
      if (!inputValue.current) return;
      if (!inputValue.current.value) return;
      await mutateAsync();
      inputValue.current.value = '';
    },
    [mutateAsync]
  );
  useEffect(() => {
    socket?.on('message', (newMessage: IMessage) => {
      console.log('teste');
      addNewMessage(newMessage);
    });

    return () => {
      socket?.off('message');
    };
  }, [addNewMessage, socket]);

  useEffect(() => {
    socket?.emit('joinRoom', roomId);

    return () => {
      socket?.emit('leaveRoom', roomId);
    };
  }, [roomId, socket]);

  return (
    <div className="bg-app w-full text-white flex flex-col">
      <ChatHeader name={data?.name} />
      <div className="px-20 py-10 h-full w-full flex flex-col">
        <div className="w-full h-full flex-1 overflow-y-auto">
          {messages &&
            messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
        </div>

        <Input
          onKeyDown={createMessage}
          ref={inputValue}
          isIconButton
          placeholder="Type a message here..."
        >
          <PaperPlaneIcon />
        </Input>
      </div>
    </div>
  );
}
