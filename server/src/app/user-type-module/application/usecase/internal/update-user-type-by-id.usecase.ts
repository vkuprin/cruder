import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeResponse } from '../../data/responses/user-type.response';
import UserTypeRepository from '../../../secondary-adapters/user-type.repository';
import { UpdateUserTypeRequest } from '../../data/requests/update-user-type.request';
import { UserTypeEntity } from '../../entities/user-type.entity';

@Injectable()
export class UpdateUserTypeByIdUsecase {
  constructor(
    @InjectRepository(UserTypeRepository)
    private userTypeRepository: UserTypeRepository,
  ) {}

  async execute(id: string, body: UpdateUserTypeRequest): Promise<UserTypeResponse> {
    const userType: UserTypeEntity = await this.userTypeRepository.findOne({ where: { id } });

    if (!userType) {
      throw new NotFoundException('User type not found!');
    }

    const updatedBody: UserTypeEntity = { ...userType, ...body };

    const updatedUserType: UserTypeEntity = await this.userTypeRepository.save(updatedBody);

    return {
      id: updatedUserType.id,
      permission: updatedUserType.permission,
      name: updatedUserType.name,
    };
  }
}
