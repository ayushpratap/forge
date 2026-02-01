import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/PrismaService';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(email, passwordHash, name?) {}

  async findByEmail(email: String) {}

  async findById(userId: Number) {}
}
