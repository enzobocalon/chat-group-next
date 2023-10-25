import create from './create';
import get from './get';
import getById from './getById';
import getMembers from './getMembers';

export interface RoomResponse {
  id: string;
  name: string;
  description?: string;
}

export const roomsService = {
  create,
  get,
  getMembers,
  getById,
};
