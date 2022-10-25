import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../../../secondary-adapters/user.repository';
import { UserEntity } from '../../data/entities/user.entity';
import {
  UserResponse,
  UserResponseBuilder,
} from '../../data/responses/user.response';

@Injectable()
export class GetUserByIdUsecase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<UserResponse> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id },
      relations: ['userType'],
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return UserResponseBuilder.build(user);
  }
}
