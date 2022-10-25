import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepository from './secondary-adapters/user.repository';
import { UserController } from './primary-adapters/user.controller';
import { ApiKeyMiddleware } from '../shared-module/primary-adapters/middlewares/api-key.middleware';
import { SharedModule } from '../shared-module/shared.module';
import { ActivateUserUsecase } from './application/usecase/external/activate-user.usecase';
import { GetUsersByProviderUsecase } from './application/usecase/external/get-users-by-provider.usecase';
import { DeleteUserByIdUsecase } from './application/usecase/internal/delete-user-by-id.usecase';
import { GetUserByIdUsecase } from './application/usecase/internal/get-user-by-id.usecase';
import { GetUsersListUsecase } from './application/usecase/internal/get-users-list.usecase';
import { RefreshTokenUsecase } from './application/usecase/internal/refresh-token.usecase';
import { SignInUsecase } from './application/usecase/internal/sign-in.usecase';
import { SignUpUsecase } from './application/usecase/internal/sign-up.usecase';
import { UpdateUserByIdUsecase } from './application/usecase/internal/update-user-by-id.usecase';
import { InvitationModule } from '../invitation-module/invitation.module';
import { ProviderModule } from '../provider-module/provider.module';
import { CreateUserUsecase } from './application/usecase/external/create-user.usecase';
import { UserTypeModule } from '../user-type-module/user-type.module';
import { GetUserInvitationsUsecase } from './application/usecase/internal/get-user-invitations.usecase';
import { ApiKeyOrTokenAuthMiddleware } from '../shared-module/primary-adapters/middlewares/api-key-or-token-auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    SharedModule,
    UserTypeModule,
    forwardRef(() => InvitationModule),
    forwardRef(() => ProviderModule),
  ],
  controllers: [UserController],
  providers: [
    ActivateUserUsecase,
    GetUsersByProviderUsecase,
    DeleteUserByIdUsecase,
    GetUserByIdUsecase,
    GetUsersListUsecase,
    RefreshTokenUsecase,
    SignInUsecase,
    SignUpUsecase,
    UpdateUserByIdUsecase,
    CreateUserUsecase,
    GetUserInvitationsUsecase,
  ],
  exports: [
    ActivateUserUsecase,
    GetUsersByProviderUsecase,
    GetUserByIdUsecase,
    CreateUserUsecase,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes(
        { path: '/users', method: RequestMethod.GET },
        { path: '/users/:id', method: RequestMethod.DELETE },
        { path: '/users/:id/invitations', method: RequestMethod.GET },
      )
      .apply(ApiKeyOrTokenAuthMiddleware)
      .forRoutes(
        { path: '/users/:id', method: RequestMethod.GET },
        { path: '/users/:id', method: RequestMethod.PUT },
      );
  }
}
