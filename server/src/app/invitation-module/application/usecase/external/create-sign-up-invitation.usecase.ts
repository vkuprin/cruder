import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import InvitationRepository from '../../../secondary-adapters/invitation.repository';
import { CreateInvitationRequest } from '../../data/requests/create-invitation.request';
import { GenerateUuidHelper } from '../../../../shared-module/application/utils/generate-uuid.helper';
import { InvitationEntity } from '../../data/entities/invitation.entity';
import { GetUserByIdUsecase } from '../../../../user-module/application/usecase/internal/get-user-by-id.usecase';

@Injectable()
export class CreateSignUpInvitationUsecase {
  constructor(
    @InjectRepository(InvitationRepository)
    private invitationRepository: InvitationRepository,
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
  ) {}

  async execute(body: CreateInvitationRequest): Promise<InvitationEntity> {
    const userEntity = await this.getUserByIdUsecase.execute(body.userId);

    if (userEntity.active) {
      throw new BadRequestException();
    }

    const key = GenerateUuidHelper.generate;

    const invitationEntity = Object.assign(new InvitationEntity(), {
      ...body,
      user: userEntity,
      key,
    });

    return await this.invitationRepository.save(invitationEntity);
  }
}
