import { IRoom } from '@/types/Room';
import { IUser } from '@/types/User';
import get from './get';
import create from './create';
import deleteMessage from './delete';

export interface MessagesResponse {
  id: string;
  content: string;
  createdAt: Date;
  user: IUser;
  room: IRoom;
}

export const messagesService = {
  get,
  create,
  deleteMessage,
};
