import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeResponse } from '../../data/responses/user-type.response';
import UserTypeRepository from '../../../secondary-adapters/user-type.repository';

@Injectable()
export class GetUserTypeByIdUsecase {
  constructor(
    @InjectRepository(UserTypeRepository)
    private userTypeRepository: UserTypeRepository,
  ) {}

  async execute(id: string): Promise<UserTypeResponse> {
    const userType = await this.userTypeRepository.findOne({ where: { id } });

    if (!userType) {
      throw new NotFoundException('User type not found!');
    }

    return {
      id: userType.id,
      permission: userType.permission,
      name: userType.name,
    };
  }
}
