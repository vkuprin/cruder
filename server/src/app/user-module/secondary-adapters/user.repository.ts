import {
  AbstractRepository,
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { UserEntity } from '../application/data/entities/user.entity';

@EntityRepository(UserEntity)
export default class UserRepository extends AbstractRepository<UserEntity> {
  async save(userEntity: UserEntity): Promise<UserEntity> {
    return this.repository.save(userEntity);
  }

  async findOne(
    options: FindOneOptions<UserEntity>,
  ): Promise<UserEntity | undefined> {
    return this.repository.findOne(options);
  }

  async find(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    return this.repository.find(options);
  }

  async removeOne(entity: UserEntity): Promise<UserEntity[]> {
    return this.repository.remove([entity]);
  }
}
