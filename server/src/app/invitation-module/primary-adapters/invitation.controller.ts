import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateInvitationUsecase } from '../application/usecase/internal/create-invitation.usecase';
import { CreateInvitationRequest } from '../application/data/requests/create-invitation.request';
import { InvitationResponse } from '../application/data/responses/invitation.response';
import { ActivateInvitationUsecase } from '../application/usecase/internal/activate-invitation.usecase';
import { GetInvitationsListUsecase } from '../application/usecase/internal/get-invitations-list.usecase';

@Controller('invitations')
@ApiTags('Invitation')
export class InvitationController {
  constructor(
    private readonly createInvitationUsecase: CreateInvitationUsecase,
    private readonly activateInvitationUsecase: ActivateInvitationUsecase,
    private readonly getInvitationsListUsecase: GetInvitationsListUsecase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() body: CreateInvitationRequest,
  ): Promise<InvitationResponse> {
    return this.createInvitationUsecase.execute(body);
  }

  @Get(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  async activateInvitation(@Param('key') key: string): Promise<void> {
    await this.activateInvitationUsecase.execute(key);
  }

  @ApiSecurity('ApiKey')
  @Get()
  async getAllInvitations(): Promise<InvitationResponse[]> {
    return this.getInvitationsListUsecase.execute();
  }
}
