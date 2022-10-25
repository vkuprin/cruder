import {
  AbstractRepository,
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { InvitationEntity } from '../application/data/entities/invitation.entity';

@EntityRepository(InvitationEntity)
export default class InvitationRepository extends AbstractRepository<InvitationEntity> {
  async save(invitationEntity: InvitationEntity): Promise<InvitationEntity> {
    return this.repository.save(invitationEntity);
  }

  async findOne(
    options: FindOneOptions<InvitationEntity>,
  ): Promise<InvitationEntity | undefined> {
    return this.repository.findOne(options);
  }

  async find(
    options?: FindManyOptions<InvitationEntity>,
  ): Promise<InvitationEntity[]> {
    return this.repository.find(options);
  }

  async removeOne(entity: InvitationEntity): Promise<InvitationEntity[]> {
    return this.repository.remove([entity]);
  }
}
