'use client';

import ChatHeader from '@/components/ChatHeader';
import { Input } from '@/components/Input';
import MessageCard from '@/components/MessageCard';
import MessageLoader from '@/components/MessageLoader';
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
  const loaderArray = [...Array(8)];

  const { data: messages, isLoading } = useQuery({
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

  const { mutateAsync: submitCreateMessage } = useMutation({
    mutationKey: ['create-message', roomId],
    mutationFn: async () => {
      if (!inputValue.current) return;
      return messagesService.create(roomId, inputValue.current.value);
    },
  });

  const createMessage = useCallback(async () => {
    if (!inputValue.current) return;
    if (!inputValue.current.value) return;
    await submitCreateMessage();
    inputValue.current.value = '';
  }, [submitCreateMessage]);

  const handleOnCreateEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;
      createMessage();
    },
    [createMessage]
  );

  useEffect(() => {
    socket?.on('message', (newMessage: IMessage) => {
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
      <div className="h-full w-full flex flex-col overflow-auto no-scrollbar">
        <div className="px-20 py-4 w-full h-full overflow-y-auto flex flex-col gap-4 no-scrollbar">
          {isLoading
            ? loaderArray.map((_, index) => <MessageLoader key={index} />)
            : messages &&
              messages.map((message) => (
                <MessageCard key={message.id} message={message} room={data} />
              ))}
        </div>

        <div className="mx-20 my-6">
          <Input
            onKeyDown={handleOnCreateEnter}
            ref={inputValue}
            isIconButton
            placeholder="Type a message here..."
            onConfirm={createMessage}
          >
            <PaperPlaneIcon />
          </Input>
        </div>
      </div>
    </div>
  );
}
