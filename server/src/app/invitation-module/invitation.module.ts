import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import InvitationRepository from './secondary-adapters/invitation.repository';
import { InvitationController } from './primary-adapters/invitation.controller';
import { UserModule } from '../user-module/user.module';
import { CreateSignUpInvitationUsecase } from './application/usecase/external/create-sign-up-invitation.usecase';
import { CreateInvitationUsecase } from './application/usecase/internal/create-invitation.usecase';
import { ActivateInvitationUsecase } from './application/usecase/internal/activate-invitation.usecase';
import { GetInvitationsListUsecase } from './application/usecase/internal/get-invitations-list.usecase';
import { ApiKeyMiddleware } from '../shared-module/primary-adapters/middlewares/api-key.middleware';
import { ApiKeyOrTokenAuthMiddleware } from '../shared-module/primary-adapters/middlewares/api-key-or-token-auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvitationRepository]),
    forwardRef(() => UserModule),
  ],
  controllers: [InvitationController],
  providers: [
    CreateSignUpInvitationUsecase,
    CreateInvitationUsecase,
    ActivateInvitationUsecase,
    GetInvitationsListUsecase,
  ],
  exports: [CreateSignUpInvitationUsecase],
})
export class InvitationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes(
        { path: '/invitations', method: RequestMethod.GET },
      );
  }
}
