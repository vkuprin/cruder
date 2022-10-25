import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../../../secondary-adapters/user.repository';
import { UserEntity } from '../../data/entities/user.entity';

@Injectable()
export class DeleteUserByIdUsecase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.userRepository.removeOne(user);
  }
}
