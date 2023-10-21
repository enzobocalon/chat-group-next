import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RoomsRepository } from 'src/shared/database/repositories/rooms.repositories';
import { SocketGateway } from 'src/shared/sockets/socket.gateway';
import { RoomsDto } from './dto/RoomsDto';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomsRepo: RoomsRepository,
    private readonly socketGateway: SocketGateway,
  ) {}

  async listRoomsByUser(userId: string) {
    const rooms = await this.roomsRepo.findManyRoomUsers({
      where: {
        userId: userId,
      },
      include: {
        room: true,
      },
    });

    return rooms;
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

  async create(userId: string, roomDto: RoomsDto) {
    const { name, description } = roomDto;

    if (!name) throw new BadRequestException('Name is required');

    const room = await this.roomsRepo.create({
      data: {
        name,
        description,
        ownerId: userId,
      },
    });

    if (!room) throw new InternalServerErrorException('Error creating room');

    return {
      roomId: room.id,
    };
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

    const isUserInRoom = await this.roomsRepo.findManyRoomUsers({
      where: {
        userId,
        roomsId: roomId,
      },
    });

    if (isUserInRoom.length > 0)
      throw new BadRequestException('User already in room');

    const leftRoom = await this.roomsRepo.leaveUserRoom({
      where: {
        id: isUserInRoom[0].id,
        userId,
        roomsId: roomId,
      },
    });

    this.socketGateway.server.to(roomId).emit('leftRoom', roomId);
    return leftRoom;
  }
}
