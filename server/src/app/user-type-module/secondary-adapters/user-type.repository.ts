import { AbstractRepository, EntityRepository, FindManyOptions, FindOneOptions } from 'typeorm';
import { UserTypeEntity } from '../application/entities/user-type.entity';

@EntityRepository(UserTypeEntity)
export default class UserTypeRepository extends AbstractRepository<UserTypeEntity> {
  async save(userTypeEntity: UserTypeEntity): Promise<UserTypeEntity> {
    return this.repository.save(userTypeEntity);
  }

  async findOne(
    options: FindOneOptions<UserTypeEntity>,
  ): Promise<UserTypeEntity | undefined> {
    return this.repository.findOne(options);
  }

  async find(
    options?: FindManyOptions<UserTypeEntity>,
  ): Promise<UserTypeEntity[]> {
    return this.repository.find(options);
  }

  async removeOne(entity: UserTypeEntity): Promise<UserTypeEntity[]> {
    return this.repository.remove([entity]);
  }
}
