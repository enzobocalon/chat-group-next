import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { RoomsRepository } from './repositories/rooms.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, RoomsRepository],
  exports: [UsersRepository, RoomsRepository],
})
export class DatabaseModule {}
