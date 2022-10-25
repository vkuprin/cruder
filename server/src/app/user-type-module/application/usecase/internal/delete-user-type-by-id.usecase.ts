import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserTypeRepository from '../../../secondary-adapters/user-type.repository';

@Injectable()
export class DeleteUserTypeByIdUsecase {
  constructor(
    @InjectRepository(UserTypeRepository)
    private userTypeRepository: UserTypeRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const userType = await this.userTypeRepository.findOne({ where: { id } });

    if (!userType) {
      throw new NotFoundException('User type not found!');
    }

    await this.userTypeRepository.removeOne(userType);
  }
}
