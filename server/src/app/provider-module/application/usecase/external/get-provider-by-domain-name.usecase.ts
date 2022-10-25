import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProviderRepository from '../../../secondary-adapters/provider.repository';
import {
  ProviderResponse,
  ProviderResponseBuilder,
} from '../../data/responses/provider.response';

@Injectable()
export class GetProviderByDomainNameUsecase {
  constructor(
    @InjectRepository(ProviderRepository)
    private providerRepository: ProviderRepository,
  ) {}

  async execute(domainName: string): Promise<ProviderResponse> {
    const providerEntity = await this.providerRepository.findOne({
      where: { domainName },
    });

    if (!providerEntity) {
      throw new NotFoundException('Provider not found!');
    }

    return ProviderResponseBuilder.build(providerEntity);
  }
}
