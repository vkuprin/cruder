import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../../../secondary-adapters/user.repository';
import {
  UserResponse,
  UserResponseBuilder,
} from '../../data/responses/user.response';
import { UserEntity } from '../../data/entities/user.entity';

@Injectable()
export class ActivateUserUsecase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async execute(userEntity: UserEntity): Promise<UserResponse> {
    if (!userEntity.active) {
      userEntity.active = true;
      await this.userRepository.save(userEntity);
    }

    return UserResponseBuilder.build(userEntity);
  }
}
