import { Prisma } from '@prisma/client';

export type MessageWithRoom = Prisma.MessagesGetPayload<{
  include: { room: true };
}>;
