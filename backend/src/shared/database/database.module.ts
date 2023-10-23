import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { RoomsRepository } from './repositories/rooms.repositories';
import { MessagesRepository } from './repositories/messages.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    RoomsRepository,
    MessagesRepository,
  ],
  exports: [UsersRepository, RoomsRepository, MessagesRepository],
})
export class DatabaseModule {}
