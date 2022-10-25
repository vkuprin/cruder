import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../../../secondary-adapters/user.repository';
import { UserEntity } from '../../data/entities/user.entity';
import { UserResponseBuilder } from '../../data/responses/user.response';
import { UserInvitationsResponse } from '../../data/responses/user-invitations.response';

@Injectable()
export class GetUserInvitationsUsecase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<UserInvitationsResponse> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id },
      relations: ['invitations', 'userType'],
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return {
      user: UserResponseBuilder.build(user),
      invitations: user?.invitations?.length
        ? user.invitations.map((el) => ({
          id: el.id,
          userId: el.userId,
          accepted: el.accepted,
          createdAt: el.createdAt,
        }))
        : [],
    };
  }
}
