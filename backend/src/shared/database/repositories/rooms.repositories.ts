import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.RoomsCreateArgs) {
    return this.prismaService.rooms.create(createDto);
  }

  findUnique(findUnique: Prisma.RoomsFindUniqueArgs) {
    return this.prismaService.rooms.findUnique(findUnique);
  }

  findMany(findMany: Prisma.RoomsFindManyArgs) {
    return this.prismaService.rooms.findMany(findMany);
  }

  findManyRoomUsers(findMany: Prisma.RoomsUsersFindManyArgs) {
    return this.prismaService.roomsUsers.findMany(findMany);
  }

  createUserRoom(createDto: Prisma.RoomsUsersCreateArgs) {
    return this.prismaService.roomsUsers.create(createDto);
  }

  leaveUserRoom(deleteDto: Prisma.RoomsUsersDeleteArgs) {
    return this.prismaService.roomsUsers.delete(deleteDto);
  }
}
