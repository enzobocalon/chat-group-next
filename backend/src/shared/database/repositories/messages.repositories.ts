import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MessagesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(create: Prisma.MessagesCreateArgs) {
    return this.prismaService.messages.create(create);
  }

  findUnique(findUnique: Prisma.MessagesFindUniqueArgs) {
    return this.prismaService.messages.findUnique(findUnique);
  }

  findMany(findMany: Prisma.MessagesFindManyArgs) {
    return this.prismaService.messages.findMany(findMany);
  }

  deleteById(deleteById: Prisma.MessagesDeleteArgs) {
    return this.prismaService.messages.delete(deleteById);
  }
}
