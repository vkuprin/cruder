import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeResponse } from '../../data/responses/user-type.response';
import UserTypeRepository from '../../../secondary-adapters/user-type.repository';

@Injectable()
export class GetUserTypesListUsecase {
  constructor(
    @InjectRepository(UserTypeRepository)
    private userTypeRepository: UserTypeRepository,
  ) {}

  async execute(): Promise<UserTypeResponse[]> {
    const userTypes = await this.userTypeRepository.find();

    return userTypes.map(userType => ({
      id: userType.id,
      permission: userType.permission,
      name: userType.name,
    }));
  }
}
