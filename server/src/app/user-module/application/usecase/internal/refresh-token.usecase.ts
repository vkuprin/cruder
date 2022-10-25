import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserRepository from '../../../secondary-adapters/user.repository';
import { RefreshTokenRequest } from '../../data/requests/refresh-token.request';
import { RefreshTokenResponse } from '../../data/responses/refresh-token.response';
import { TokenPayload } from '../../../../shared-module/application/interfaces/token-payload.interface';
import { AuthService } from '../../../../shared-module/application/services/auth.service';
import { UserResponseBuilder } from '../../data/responses/user.response';
import { GetProviderByDomainNameUsecase } from '../../../../provider-module/application/usecase/external/get-provider-by-domain-name.usecase';

@Injectable()
export class RefreshTokenUsecase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly getProviderByDomainNameUsecase: GetProviderByDomainNameUsecase,
  ) {}

  async execute(body: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const decodedToken: TokenPayload = AuthService.isRefreshTokenValid(
      body.refreshToken,
    );

    if (!decodedToken) {
      throw new UnauthorizedException('Refresh token is not valid!');
    }

    const user = await this.userRepository.findOne({
      where: { id: decodedToken.userId },
    });
    const provider = await this.getProviderByDomainNameUsecase.execute(
      decodedToken.domain,
    );

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
