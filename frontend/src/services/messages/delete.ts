import { MessagesResponse } from '.';
import { httpClient } from '../httpClient';

export default async function deleteMessage(id: string) {
  const { data } = await httpClient.delete<MessagesResponse>(
    `/messages/delete/${id}`
  );

  return data;
}
