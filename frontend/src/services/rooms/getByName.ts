import { RoomResponse } from '.';
import { httpClient } from '../httpClient';

export default async function getByName(name: string) {
  const { data } = await httpClient.get<RoomResponse>(
    `/rooms/filter?name=${name}`
  );

  return data;
}
