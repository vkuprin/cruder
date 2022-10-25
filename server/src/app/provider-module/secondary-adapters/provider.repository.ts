import {
  AbstractRepository,
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { ProviderEntity } from '../application/data/entities/provider.entity';

@EntityRepository(ProviderEntity)
export default class ProviderRepository extends AbstractRepository<ProviderEntity> {
  async save(providerEntity: ProviderEntity): Promise<ProviderEntity> {
    return this.repository.save(providerEntity);
  }

  async findOne(
    options: FindOneOptions<ProviderEntity>,
  ): Promise<ProviderEntity | undefined> {
    return this.repository.findOne(options);
  }

  async find(
    options?: FindManyOptions<ProviderEntity>,
  ): Promise<ProviderEntity[]> {
    return this.repository.find(options);
  }

  async removeOne(entity: ProviderEntity): Promise<ProviderEntity[]> {
    return this.repository.remove([entity]);
  }
}
