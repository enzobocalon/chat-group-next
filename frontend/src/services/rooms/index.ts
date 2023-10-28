import create from './create';
import get from './get';
import getById from './getById';
import getMembers from './getMembers';
import getByName from './getByName';
import join from './join';

export interface RoomResponse {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
}

export const roomsService = {
  create,
  get,
  getMembers,
  getById,
  getByName,
  join,
};
