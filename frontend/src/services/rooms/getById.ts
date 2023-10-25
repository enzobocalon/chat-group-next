import { RoomResponse } from '.';
import { httpClient } from '../httpClient';

export default async function getById(id: string) {
  const { data } = await httpClient.get<RoomResponse>(`/rooms/${id}`);

  return data;
}
