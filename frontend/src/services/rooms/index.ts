import create from './create';
import get from './get';

export interface RoomResponse {
  id: string;
  name: string;
  description?: string;
}

export const roomsService = {
  create,
  get,
};
