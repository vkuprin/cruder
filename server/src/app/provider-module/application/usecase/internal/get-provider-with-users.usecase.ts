import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProviderRepository from '../../../secondary-adapters/provider.repository';
import {
  ProviderResponse,
  ProviderResponseBuilder,
} from '../../data/responses/provider.response';
import { GetUsersByProviderUsecase } from '../../../../user-module/application/usecase/external/get-users-by-provider.usecase';
import { UserResponse } from '../../../../user-module/application/data/responses/user.response';

@Injectable()
export class GetProviderWithUsersUsecase {
  constructor(
    @InjectRepository(ProviderRepository)
    private providerRepository: ProviderRepository,
    private readonly getUsersByProviderUsecase: GetUsersByProviderUsecase,
  ) {}

  async execute(id: string): Promise<ProviderResponse> {
    const providerEntity = await this.providerRepository.findOne({
      where: { id },
    });

    if (!providerEntity) {
      throw new NotFoundException('Provider not found!');
    }

    const providerUsers: UserResponse[] =
      await this.getUsersByProviderUsecase.execute(providerEntity.id);

    return ProviderResponseBuilder.build(providerEntity, providerUsers);
  }
}
