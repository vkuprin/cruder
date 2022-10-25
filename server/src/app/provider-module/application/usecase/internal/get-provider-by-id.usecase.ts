import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProviderRepository from '../../../secondary-adapters/provider.repository';
import {
  ProviderResponse,
  ProviderResponseBuilder,
} from '../../data/responses/provider.response';

@Injectable()
export class GetProviderByIdUsecase {
  constructor(
    @InjectRepository(ProviderRepository)
    private providerRepository: ProviderRepository,
  ) {}

  async execute(id: string): Promise<ProviderResponse> {
    const providerEntity = await this.providerRepository.findOne({
      where: { id },
    });

    if (!providerEntity) {
      throw new NotFoundException('Provider not found!');
    }

    return ProviderResponseBuilder.build(providerEntity);
  }
}
