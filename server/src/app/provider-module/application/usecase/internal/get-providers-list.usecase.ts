import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProviderRepository from '../../../secondary-adapters/provider.repository';
import {
  ProviderResponse,
  ProviderResponseBuilder,
} from '../../data/responses/provider.response';

@Injectable()
export class GetProvidersListUsecase {
  constructor(
    @InjectRepository(ProviderRepository)
    private providerRepository: ProviderRepository,
  ) {}

  async execute(): Promise<ProviderResponse[]> {
    const providers = await this.providerRepository.find();

    return providers.map((provider) => ProviderResponseBuilder.build(provider));
  }
}
