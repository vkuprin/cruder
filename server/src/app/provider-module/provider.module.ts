import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProviderRepository from './secondary-adapters/provider.repository';
import { ProviderController } from './primary-adapters/provider.controller';
import { UserTypeModule } from '../user-type-module/user-type.module';
import { InvitationModule } from '../invitation-module/invitation.module';
import { UserModule } from '../user-module/user.module';
import { ApiKeyMiddleware } from '../shared-module/primary-adapters/middlewares/api-key.middleware';
import { GetProviderByDomainNameUsecase } from './application/usecase/external/get-provider-by-domain-name.usecase';
import { CreateProviderUsecase } from './application/usecase/internal/create-provider.usecase';
import { GetProviderByIdUsecase } from './application/usecase/internal/get-provider-by-id.usecase';
import { GetProviderWithUsersUsecase } from './application/usecase/internal/get-provider-with-users.usecase';
import { GetProvidersListUsecase } from './application/usecase/internal/get-providers-list.usecase';
import { DeleteProviderByIdUsecase } from './application/usecase/internal/delete-provider-by-id.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProviderRepository]),
    UserTypeModule,
    forwardRef(() => UserModule),
    forwardRef(() => InvitationModule),
  ],
  controllers: [ProviderController],
  providers: [
    GetProviderByDomainNameUsecase,
    CreateProviderUsecase,
    GetProviderByIdUsecase,
    GetProviderWithUsersUsecase,
    GetProvidersListUsecase,
    DeleteProviderByIdUsecase,
  ],
  exports: [GetProviderByDomainNameUsecase],
})
export class ProviderModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes(
        { path: 'providers', method: RequestMethod.POST },
        { path: 'providers/:id', method: RequestMethod.DELETE },
        { path: 'providers/:id/users', method: RequestMethod.GET },
      );
  }
}
