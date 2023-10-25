import { RoomResponse } from '.';
import { httpClient } from '../httpClient';

export default async function get() {
  const { data } = await httpClient.get<RoomResponse[]>('/rooms');

  return data;
}
