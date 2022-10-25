import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../../../secondary-adapters/user.repository';
import { UserEntity } from '../../data/entities/user.entity';
import {
  UserResponse,
  UserResponseBuilder,
} from '../../data/responses/user.response';
import { UpdateUserRequest } from '../../data/requests/update-user.request';

@Injectable()
export class UpdateUserByIdUsecase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async execute(id: string, body: UpdateUserRequest): Promise<UserResponse> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id },
      relations: ['userType'],
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const updatedBody = { ...user, ...body };

    const updatedUser = await this.userRepository.save(updatedBody);

    return UserResponseBuilder.build(updatedUser);
  }
}
