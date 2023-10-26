import {
  BadRequestException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';
import { MessagesRepository } from 'src/shared/database/repositories/messages.repositories';
import { RoomsRepository } from 'src/shared/database/repositories/rooms.repositories';
import { MessageDto } from './dto/MessageDto';
import { SocketGateway } from 'src/shared/sockets/socket.gateway';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepo: MessagesRepository,
    private readonly roomsRepo: RoomsRepository,
    private readonly socketGateway: SocketGateway,
  ) {}
  async listMessagesByRoom(userId: string, roomId: string) {
    // Add pagination
    const isUserInRoom = await this.roomsRepo.findManyRoomUsers({
      where: {
        userId,
        roomsId: roomId,
      },
    });

    if (isUserInRoom.length === 0) {
      throw new BadRequestException('User is not in this room');
    }

    return this.messagesRepo.findMany({
      where: {
        roomsId: roomId,
      },
      include: {
        user: true,
      },
    });
  }

  async create(userId: string, roomId: string, data: MessageDto) {
    const isUserInRoom = await this.roomsRepo.findManyRoomUsers({
      where: {
        userId,
        roomsId: roomId,
      },
    });

    if (isUserInRoom.length === 0) {
      throw new BadRequestException('User is not in this room');
    }

    const { content } = data;

    const message = await this.messagesRepo.create({
      data: {
        userId,
        roomsId: roomId,
        content,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!message)
      throw new InternalServerErrorException('Error on create message');

    this.socketGateway.server.to(roomId).emit('message', message);
    return message;
  }
}
