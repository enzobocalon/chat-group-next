import { RoomResponse } from '.';
import { httpClient } from '../httpClient';

export interface CreateRoomParams {
  name: string;
  description?: string;
}

export default async function create(params: CreateRoomParams) {
  const { data } = await httpClient.post<RoomResponse>('/rooms/create', params);

  return data;
}
