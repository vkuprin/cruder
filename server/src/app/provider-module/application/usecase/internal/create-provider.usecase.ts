import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProviderRepository from '../../../secondary-adapters/provider.repository';
import {
  ProviderResponse,
  ProviderResponseBuilder,
} from '../../data/responses/provider.response';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateProviderRequest } from '../../data/requests/create-provider.request';
import { ProviderEntity } from '../../data/entities/provider.entity';
import { KafkaTopics } from '../../../../config/kafka.config';
import { EmailType } from '../../../../shared-module/application/enums/email-type.enum';
import { KafkaService } from '../../../../shared-module/secondary-adapters/msk/kafka.service';
import { CreateSignUpInvitationUsecase } from '../../../../invitation-module/application/usecase/external/create-sign-up-invitation.usecase';
import { GetUserTypeByIdUsecase } from '../../../../user-type-module/application/usecase/internal/get-user-type-by-id.usecase';
import { UserResponse } from '../../../../user-module/application/data/responses/user.response';
import { EntityManager, getManager, TransactionManager } from 'typeorm';
import { UserTypeResponse } from '../../../../user-type-module/application/data/responses/user-type.response';
import { UserEntity } from '../../../../user-module/application/data/entities/user.entity';
import { AuthService } from '../../../../shared-module/application/services/auth.service';

@Injectable()
export class CreateProviderUsecase {
  constructor(
    @InjectRepository(ProviderRepository)
    private providerRepository: ProviderRepository,
    private readonly createSignUpInvitationUsecase: CreateSignUpInvitationUsecase,
    private readonly getUserTypeByIdUsecase: GetUserTypeByIdUsecase,
  ) {}

  async execute(body: CreateProviderRequest): Promise<ProviderResponse> {
    if (body.users?.length) {
      return this.saveProviderWithUsers(body);
    }

    const providerEntity = await this.saveProvider(body);
    return ProviderResponseBuilder.build(providerEntity);
  }

  private async saveProvider(
    body: CreateProviderRequest,
  ): Promise<ProviderEntity> {
    const providerEntity = Object.assign(new ProviderEntity(), {
      ...body,
    });
    return this.providerRepository.save(providerEntity);
  }

  private async saveProviderWithUsers(
    body: CreateProviderRequest,
  ): Promise<ProviderResponse> {
    const [provider, users] = await getManager().transaction(
      async (transactionalEntityManager) =>
        this.saveProviderWithUsersTransaction(body, transactionalEntityManager),
    );

    await this.sendUserInvitations(users);

    return ProviderResponseBuilder.build(provider, users);
  }

  private async sendUserInvitations(users: UserResponse[]): Promise<void> {
    const usersInvitationsEntities = await Promise.allSettled(
      users.map((user) =>
        this.createSignUpInvitationUsecase.execute({ userId: user.id }),
      ),
    );

    usersInvitationsEntities.forEach((invitation, index) => {
      const user = users[index];
      if (invitation.status === 'fulfilled' && !user.active) {
        KafkaService.sendMessage(KafkaTopics.Email, {
          userId: user.id,
          email: user.email,
          key: invitation.value.key,
          type: EmailType.activateUser,
        });
      }
    });
  }

  @Transactional()
  private async saveProviderWithUsersTransaction(
    body: CreateProviderRequest,
    @TransactionManager() transactionManager: EntityManager = null,
  ): Promise<[ProviderEntity, UserResponse[] | undefined]> {
    const providerEntity = Object.assign(new ProviderEntity(), {
      domainName: body.domainName,
      sentence: body.sentence,
      url: body.url,
    });
    const savedProvider = await transactionManager.save(providerEntity);

    const userTypes: UserTypeResponse[] = await Promise.all(
      body.users.map((el) =>
        this.getUserTypeByIdUsecase.execute(el.userTypeId),
      ),
    );

    const passwords: string[] = await Promise.all(
      body.users.map((el) => AuthService.hashPass(el.password)),
    );

    const savedUsers = await Promise.all(
      body.users.map((user, index) => {
        const userEntity = Object.assign(new UserEntity(), {
          ...user,
          password: passwords[index],
          providerId: savedProvider.id,
          userType: userTypes[index],
        });

        return transactionManager.save(userEntity);
      }),
    );

    return [savedProvider, savedUsers];
  }
}
