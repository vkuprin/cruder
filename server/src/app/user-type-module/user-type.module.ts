import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserTypeRepository from './secondary-adapters/user-type.repository';
import { UserTypeController } from './primary-adapters/user-type.controller';
import { CreateUserTypeUsecase } from './application/usecase/internal/create-user-type.usecase';
import { DeleteUserTypeByIdUsecase } from './application/usecase/internal/delete-user-type-by-id.usecase';
import { GetUserTypeByIdUsecase } from './application/usecase/internal/get-user-type-by-id.usecase';
import { GetUserTypesListUsecase } from './application/usecase/internal/get-user-types-list.usecase';
import { UpdateUserTypeByIdUsecase } from './application/usecase/internal/update-user-type-by-id.usecase';
import { ApiKeyMiddleware } from '../shared-module/primary-adapters/middlewares/api-key.middleware';
import { ApiKeyOrTokenAuthMiddleware } from '../shared-module/primary-adapters/middlewares/api-key-or-token-auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeRepository])],
  controllers: [UserTypeController],
  providers: [
    CreateUserTypeUsecase,
    DeleteUserTypeByIdUsecase,
    GetUserTypeByIdUsecase,
    GetUserTypesListUsecase,
    UpdateUserTypeByIdUsecase,
  ],
  exports: [GetUserTypeByIdUsecase],
})
export class UserTypeModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes(
        { path: 'userTypes', method: RequestMethod.POST },
        { path: 'userTypes/:id', method: RequestMethod.PUT },
        { path: 'userTypes/:id', method: RequestMethod.DELETE }
      )
      .apply(ApiKeyOrTokenAuthMiddleware)
      .forRoutes(
        { path: 'userTypes/:id', method: RequestMethod.GET },
        { path: 'userTypes', method: RequestMethod.GET },
      );
  }
}
