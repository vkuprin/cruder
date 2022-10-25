import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../../../secondary-adapters/user.repository';
import { UserEntity } from '../../data/entities/user.entity';
import {
  UserResponse,
  UserResponseBuilder,
} from '../../data/responses/user.response';
import { KafkaTopics } from '../../../../config/kafka.config';
import { EmailType } from '../../../../shared-module/application/enums/email-type.enum';
import { GetUserTypeByIdUsecase } from '../../../../user-type-module/application/usecase/internal/get-user-type-by-id.usecase';
import { SignUpRequest } from '../../data/requests/sign-up.request';
import { KafkaService } from '../../../../shared-module/secondary-adapters/msk/kafka.service';
import { CreateSignUpInvitationUsecase } from '../../../../invitation-module/application/usecase/external/create-sign-up-invitation.usecase';
import { InvitationEntity } from '../../../../invitation-module/application/data/entities/invitation.entity';
import { AuthService } from '../../../../shared-module/application/services/auth.service';

@Injectable()
export class SignUpUsecase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly getUserTypeByIdUsecase: GetUserTypeByIdUsecase,
    private readonly createSignUpInvitationUsecase: CreateSignUpInvitationUsecase,
  ) {}

  async execute(body: SignUpRequest): Promise<UserResponse> {
    const userTypeEntity = await this.getUserTypeByIdUsecase.execute(
      body.userTypeId,
    );

    const userEntity = Object.assign(new UserEntity(), {
      ...body,
      userType: userTypeEntity,
      password: await AuthService.hashPass(body.password),
    });

    const savedUser = await this.userRepository.save(userEntity);

    if (!savedUser.active) {
      const userInvitation: InvitationEntity =
        await this.createSignUpInvitationUsecase.execute({
          userId: savedUser.id,
        });

      KafkaService.sendMessage(KafkaTopics.Email, {
        userId: savedUser.id,
        email: savedUser.email,
        key: userInvitation.key,
        type: EmailType.activateUser,
      });
    }

    KafkaService.sendMessage(KafkaTopics.User, savedUser);

    return UserResponseBuilder.build(savedUser);
  }
}
