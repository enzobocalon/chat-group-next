import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getUserById(userId: string) {
    if (!userId) throw new UnauthorizedException();
    const user = await this.usersRepo.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        avatar: true,
      },
    });

    return user;
  }
}
