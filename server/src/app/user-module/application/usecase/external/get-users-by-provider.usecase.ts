import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../../../secondary-adapters/user.repository';
import { UserEntity } from '../../data/entities/user.entity';
import {
  UserResponse,
  UserResponseBuilder,
} from '../../data/responses/user.response';

@Injectable()
export class GetUsersByProviderUsecase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async execute(providerId: string): Promise<UserResponse[]> {
    const users: UserEntity[] = await this.userRepository.find({
      where: { providerId },
      relations: ['userType'],
    });

    return users.map(UserResponseBuilder.build);
  }
}
