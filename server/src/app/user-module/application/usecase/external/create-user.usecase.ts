import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequest } from '../../data/requests/create-user.request';
import {
  UserResponse,
  UserResponseBuilder,
} from '../../data/responses/user.response';
import UserRepository from '../../../secondary-adapters/user.repository';
import { UserEntity } from '../../data/entities/user.entity';
import { GetUserTypeByIdUsecase } from '../../../../user-type-module/application/usecase/internal/get-user-type-by-id.usecase';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly getUserTypeByIdUsecase: GetUserTypeByIdUsecase,
  ) {}

  async execute(body: CreateUserRequest): Promise<UserResponse> {
    const userType = await this.getUserTypeByIdUsecase.execute(body.userTypeId);

    if (!userType) {
      throw new NotFoundException('User type not found!');
    }

    const userEntity = Object.assign(new UserEntity(), {
      ...body,
      userType: userType,
    });

    const savedUser = await this.userRepository.save(userEntity);

    return UserResponseBuilder.build(savedUser);
  }
}
