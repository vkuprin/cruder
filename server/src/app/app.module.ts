import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import connectionOptions from './config/ormconfig';
import { UserTypeModule } from './user-type-module/user-type.module';
import { ProviderModule } from './provider-module/provider.module';
import { UserModule } from './user-module/user.module';
import { InvitationModule } from './invitation-module/invitation.module';
import { ErrorHandlerMiddleware } from './shared-module/primary-adapters/middlewares/error-handler.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    // UserTypeModule,
    // ProviderModule,
    // UserModule,
    // InvitationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHandlerMiddleware,
    },
  ],
})
export class AppModule {}
