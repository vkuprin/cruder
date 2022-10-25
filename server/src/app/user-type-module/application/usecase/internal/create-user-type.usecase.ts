import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserTypeRequest } from '../../data/requests/create-user-type.request';
import { UserTypeResponse } from '../../data/responses/user-type.response';
import { UserTypeEntity } from '../../entities/user-type.entity';
import UserTypeRepository from '../../../secondary-adapters/user-type.repository';

@Injectable()
export class CreateUserTypeUsecase {
  constructor(
    @InjectRepository(UserTypeRepository)
    private userTypeRepository: UserTypeRepository,
  ) {}

  async execute(body: CreateUserTypeRequest): Promise<UserTypeResponse> {
    const userTypeEntity = Object.assign(new UserTypeEntity(), body);

    const savedUserType = await this.userTypeRepository.save(userTypeEntity);

    return {
      id: savedUserType.id,
      permission: savedUserType.permission,
      name: savedUserType.name,
    };
  }
}
