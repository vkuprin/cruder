import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import InvitationRepository from '../../../secondary-adapters/invitation.repository';
import { InvitationResponse } from '../../data/responses/invitation.response';

@Injectable()
export class GetInvitationsListUsecase {
  constructor(
    @InjectRepository(InvitationRepository)
    private invitationRepository: InvitationRepository,
  ) {}

  async execute(): Promise<InvitationResponse[]> {
    const invitations = await this.invitationRepository.find();

    return invitations.map((el) => ({
      id: el.id,
      userId: el.userId,
      accepted: el.accepted,
      createdAt: el.createdAt,
    }));
  }
}
