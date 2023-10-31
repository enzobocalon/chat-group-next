import { RoomResponse } from '.';
import { httpClient } from '../httpClient';

export default async function leave(id: string) {
  const { data } = await httpClient.post<RoomResponse[]>(`/rooms/left/${id}`);

  return data;
}
