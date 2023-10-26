import { RoomResponse } from '.';
import { httpClient } from '../httpClient';

export default async function getByName(name: string) {
  const param = new URLSearchParams({ name });
  console.log(param);
  const { data } = await httpClient.get<RoomResponse[]>(
    `/rooms/filters?${param}`
  );

  return data;
}
