import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../../../secondary-adapters/user.repository';
import { SignInRequest } from '../../data/requests/sign-in.request';
import { AuthService } from '../../../../shared-module/application/services/auth.service';
import { SignInResponse } from '../../data/responses/sign-in.response';
import { UserResponseBuilder } from '../../data/responses/user.response';
import { GetProviderByDomainNameUsecase } from '../../../../provider-module/application/usecase/external/get-provider-by-domain-name.usecase';
import { ProviderResponse } from '../../../../provider-module/application/data/responses/provider.response';

@Injectable()
export class SignInUsecase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly getProviderByDomainNameUsecase: GetProviderByDomainNameUsecase,
  ) {}

  async execute(body: SignInRequest): Promise<SignInResponse> {
    const provider: ProviderResponse =
      await this.getProviderByDomainNameUsecase.execute(body.domain);

    const user = await this.userRepository.findOne({
      where: { email: body.email, providerId: provider.id },
      relations: ['userType'],
    });

    if (!user || !user.active) {
      throw new BadRequestException();
    }

    const passCorrect = await AuthService.isPasswordCorrect(
      body.password,
      user.password,
    );

    if (!passCorrect) {
      throw new BadRequestException();
    }

    const tokens = AuthService.generateTokens({
      email: user.email,
      domain: provider.domainName,
      userType: user.userType.name,
      userId: user.id,
      permission: user.userType.permission,
    });

    return {
      user: UserResponseBuilder.build(user),
      tokens,
    };
  }
}
