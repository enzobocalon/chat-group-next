import { MessagesResponse } from '.';
import { httpClient } from '../httpClient';

export default async function get(id: string) {
  const { data } = await httpClient.get<MessagesResponse[]>(`/messages/${id}`);

  return data;
}
