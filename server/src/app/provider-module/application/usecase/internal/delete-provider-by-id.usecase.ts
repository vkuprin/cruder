import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProviderRepository from '../../../secondary-adapters/provider.repository';

@Injectable()
export class DeleteProviderByIdUsecase {
  constructor(
    @InjectRepository(ProviderRepository)
    private providerRepository: ProviderRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const providerEntity = await this.providerRepository.findOne({
      where: { id },
    });

    if (!providerEntity) {
      throw new NotFoundException('Provider not found!');
    }

    await this.providerRepository.removeOne(providerEntity);
  }
}
