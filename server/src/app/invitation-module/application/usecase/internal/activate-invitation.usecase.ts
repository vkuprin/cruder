import { BadRequestException, GoneException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import InvitationRepository from '../../../secondary-adapters/invitation.repository';
import { addHours, differenceInHours } from 'date-fns';
import { appConfig } from '../../../../config/app.config';
import { ActivateUserUsecase } from '../../../../user-module/application/usecase/external/activate-user.usecase';

@Injectable()
export class ActivateInvitationUsecase {
  constructor(
    @InjectRepository(InvitationRepository)
    private invitationRepository: InvitationRepository,
    private readonly activateUserUsecase: ActivateUserUsecase,
  ) {}

  async execute(key: string): Promise<void> {
    const invitationEntity = await this.invitationRepository.findOne({
      where: { key },
      relations: ['user'],
    });

    if (invitationEntity.accepted) {
      throw new BadRequestException();
    }

    if (this.isExpired(invitationEntity.createdAt)) {
      await this.invitationRepository.removeOne(invitationEntity);
      throw new GoneException();
    }

    await this.activateUserUsecase.execute(invitationEntity.user);
    await this.invitationRepository.removeOne(invitationEntity);
  }

  private isExpired(createdAt: Date): boolean {
    const difference: number = differenceInHours(
      addHours(createdAt, appConfig.invitationExpirationHours),
      new Date(),
    );

    return difference <= 0;
  }
}
