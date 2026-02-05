import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/PrismaService';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    email: string,
    name: string,
    passwordHash: string,
    avatarUrl?: string,
  ) {
    return this.prisma.user.create({
      data: { email, name, passwordHash, avatarUrl },
      select: { id: true, name: true, email: true, avatarUrl: true },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  async findById(userId: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }
}
