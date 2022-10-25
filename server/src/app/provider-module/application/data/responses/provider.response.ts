import { UserResponse } from '../../../../user-module/application/data/responses/user.response';
import { ProviderEntity } from '../entities/provider.entity';

export interface ProviderResponse {
  id: string;
  domainName: string;
  active: boolean;
  parentProviderId: string;
  sentence: string;
  url: string;
  users?: UserResponse[];
}

export class ProviderResponseBuilder {
  static build(
    provider: ProviderEntity,
    users?: UserResponse[],
  ): ProviderResponse {
    return {
      id: provider.id,
      domainName: provider.domainName,
      active: provider.active,
      parentProviderId: provider.parentProviderId,
      sentence: provider.sentence,
      url: provider.url,
      users: users?.length ? users : undefined,
    };
  }
}
