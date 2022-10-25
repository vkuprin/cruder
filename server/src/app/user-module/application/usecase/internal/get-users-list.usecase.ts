import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../../../secondary-adapters/user.repository';
import { UserEntity } from '../../data/entities/user.entity';
import {
  UserResponse,
  UserResponseBuilder,
} from '../../data/responses/user.response';

@Injectable()
export class GetUsersListUsecase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserResponse[]> {
    const users: UserEntity[] = await this.userRepository.find({
      relations: ['userType'],
    });

    return users.map(UserResponseBuilder.build);
  }
}
