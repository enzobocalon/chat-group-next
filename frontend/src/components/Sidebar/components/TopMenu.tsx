'use client';

import { Input } from '@/components/Input';
import Modal from '@/components/Modal';
import { Textarea } from '@/components/Textarea';
import { ChevronLeftIcon, PlusIcon } from '@radix-ui/react-icons';
import { useCallback, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateRoomParams } from '@/services/rooms/create';
import { roomsService } from '@/services/rooms';
import { IRoom } from '@/types/Room';
import toast from 'react-hot-toast';

interface Props {
  hasChat: boolean;
  onToggle: () => void;
}

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function TopMenu({ hasChat, onToggle }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['createChannel'],
    mutationFn: async (data: CreateRoomParams) => {
      return roomsService.create(data);
    },
    onSuccess: (data) => {
      setIsModalOpen(false);
      queryClient.setQueryData(['rooms'], (prev: IRoom[]) => {
        return [...prev, data];
      });
      reset();
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      toast.success('Channel created successfully');
    } catch (e) {
      console.log(e);
    }
  });

  const toggleModalStatus = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  return (
    <div
      className="w-full flex gap-4 items-center bg-app-foreground p-4 cursor-pointer shadow-3xl"
      onClick={onToggle}
    >
      {hasChat && (
        <div className="flex flex-1 w-full items-center">
          <div className="text-white w-8 h-8 flex items-center">
            <ChevronLeftIcon color="white" className="w-6 h-6" />
          </div>
          <span className="text-white font-bold tracking-[-0.63px]">
            All channels
          </span>
        </div>
      )}

      {!hasChat && (
        <div className="flex flex-1 w-full justify-between items-center">
          <span className="text-white font-bold tracking-[-0.63px]">
            Channels
          </span>
          <div className="text-white w-8 h-8 flex items-center justify-between bg-app rounded-lg hover:opacity-75 transition-all">
            <PlusIcon className="w-6 h-6 flex-1" onClick={toggleModalStatus} />
          </div>
        </div>
      )}
      <Modal
        title="New Channel"
        onConfirm={handleSubmit}
        isOpen={isModalOpen}
        onClose={toggleModalStatus}
        isLoading={isPending}
        className="w-full flex flex-col h-full max-w-[656px] max-h-[360px]"
      >
        <form className="flex flex-col flex-1 gap-4">
          <Input
            placeholder="Channel name"
            {...register('name')}
            error={errors.name?.message}
          />
          <Textarea
            {...register('description')}
            placeholder="Channel Description"
            className="flex-1 h-full"
            error={errors.description?.message}
          />
        </form>
      </Modal>
    </div>
  );
}
