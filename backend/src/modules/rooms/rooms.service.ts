import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RoomsRepository } from 'src/shared/database/repositories/rooms.repositories';
import { SocketGateway } from 'src/shared/sockets/socket.gateway';
import { RoomsDto } from './dto/RoomsDto';
import { RoomUsersPopulated } from 'src/shared/types/RoomUsersPopulated';
import { MessagesRepository } from 'src/shared/database/repositories/messages.repositories';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomsRepo: RoomsRepository,
    private readonly messagesRepo: MessagesRepository,
    private readonly socketGateway: SocketGateway,
  ) {}

  async listRoomsByUser(userId: string) {
    const rooms = (await this.roomsRepo.findManyRoomUsers({
      where: {
        userId: userId,
      },
      select: {
        room: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    })) as RoomUsersPopulated[];

    return rooms.map((room) => room.room);
  }

  async listRoomById(id: string) {
    if (!id) throw new BadRequestException('Room id is required');

    const room = await this.roomsRepo.findUnique({
      where: {
        id,
      },
    });

    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async listMembersByRoom(id: string) {
    const members = (await this.roomsRepo.findManyRoomUsers({
      where: {
        roomsId: id,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })) as RoomUsersPopulated[];

    return members.map((data) => data.user);
  }

  async listRoomByName(name: string) {
    const rooms = await this.roomsRepo.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    return rooms;
  }

  async create(userId: string, roomDto: RoomsDto) {
    const { name, description } = roomDto;

    if (!name) throw new BadRequestException('Name is required');

    const room = await this.roomsRepo.create({
      data: {
        name,
        description,
        ownerId: userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!room) throw new InternalServerErrorException('Error creating room');

    await this.roomsRepo.createUserRoom({
      data: {
        userId,
        roomsId: room.id,
      },
    });

    return room;
  }

  async joinRoom(userId: string, roomId: string) {
    if (!userId) throw new BadRequestException('User id is required');
    if (!roomId) throw new BadRequestException('Room id is required');

    const room = await this.roomsRepo.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) throw new NotFoundException('Room not found');

    const isUserAlreadyInRoom = await this.roomsRepo.findManyRoomUsers({
      where: {
        userId,
        roomsId: roomId,
      },
    });

    if (isUserAlreadyInRoom.length > 0)
      throw new BadRequestException('User already in room');

    const joinedRoom = await this.roomsRepo.createUserRoom({
      data: {
        userId,
        roomsId: roomId,
      },
    });

    this.socketGateway.server.to(roomId).emit('joinedRoom', roomId);
    return joinedRoom;
  }

  async leftRoom(userId: string, roomId: string) {
    if (!userId) throw new BadRequestException('User id is required');
    if (!roomId) throw new BadRequestException('Room id is required');

    const room = await this.roomsRepo.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) throw new NotFoundException('Room not found');

    if (room.ownerId === userId) {
      await this.roomsRepo.deleteAllUsersFromRoom({
        where: {
          roomsId: roomId,
        },
      });

      await this.messagesRepo.deleteMany({
        where: {
          roomsId: roomId,
        },
      });

      const { id: deletedId } = await this.roomsRepo.deleteRoom({
        where: {
          id: roomId,
        },
      });

      this.socketGateway.server.to(roomId).emit('deleteRoom', roomId);
      return deletedId;
    }

    const isUserInRoom = await this.roomsRepo.findManyRoomUsers({
      where: {
        userId,
        roomsId: roomId,
      },
    });

    if (!isUserInRoom.length)
      throw new BadRequestException('User is not in room');

    const leftRoom = await this.roomsRepo.leaveUserRoom({
      where: {
        id: isUserInRoom[0].id,
        userId,
        roomsId: roomId,
      },
    });

    this.socketGateway.server.to(roomId).emit('leftRoom', userId);
    return leftRoom;
  }
}
