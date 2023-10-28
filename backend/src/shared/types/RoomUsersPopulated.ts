import { Prisma } from '@prisma/client';

export type RoomUsersPopulated = Prisma.RoomsUsersGetPayload<{
  include: {
    room: true;
    user: true;
  };
}>;
