import { MessagesResponse } from '.';
import { httpClient } from '../httpClient';

export default async function create(id: string, content: string) {
  const body = {
    content,
  };
  const { data } = await httpClient.post<MessagesResponse>(
    `/messages/create/${id}`,
    body
  );

  return data;
}
