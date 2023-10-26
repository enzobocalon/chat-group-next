import { RoomResponse } from '.';
import { httpClient } from '../httpClient';

export default async function join(id: string) {
  const { data } = await httpClient.post<RoomResponse[]>(`/rooms/join/${id}`);

  return data;
}
