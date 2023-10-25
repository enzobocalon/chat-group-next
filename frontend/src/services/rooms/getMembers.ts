import { IUser } from '@/types/User';
import { httpClient } from '../httpClient';

export default async function getMembers(id: string) {
  const { data } = await httpClient.get<IUser[]>(`/rooms/members/${id}`);

  return data;
}
