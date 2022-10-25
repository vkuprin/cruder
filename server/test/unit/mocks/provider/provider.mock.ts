import { ProviderEntity } from '../../../../src/app/provider-module/application/data/entities/provider.entity';
import { UserMock } from '../user/user.mock';
import { CreateProviderRequest } from '../../../../src/app/provider-module/application/data/requests/create-provider.request';
import { ProviderResponse } from '../../../../src/app/provider-module/application/data/responses/provider.response';

const createdAt = new Date();
const updatedAt = new Date();

const providerEntityWithUsersMock1: ProviderEntity = {
  id: 'providerFakeId',
  active: true,
  domainName: 'domain.fake',
  parentProviderId: undefined,
  users: [UserMock.entity1, UserMock.entity2],
  sentence: 'sentence',
  url: 'url',
  createdAt,
  updatedAt,
};

const providerEntityMock2: ProviderEntity = {
  id: 'providerFakeId',
  active: true,
  domainName: 'domain.fake',
  parentProviderId: undefined,
  users: [],
  sentence: 'sentence',
  url: 'url',
  createdAt,
  updatedAt,
};

const providerDtoMock1: CreateProviderRequest = {
  domainName: 'domain.fake',
  users: undefined,
  sentence: 'sentence',
  url: 'url',
};

const providerWithUsersDtoMock1: CreateProviderRequest = {
  domainName: 'domain.fake',
  users: [UserMock.signUpRequest1, UserMock.signUpRequest2],
  sentence: 'sentence',
  url: 'url',
};

const providerResponseWithUsersMock1: ProviderResponse = {
  id: 'providerFakeId',
  active: true,
  domainName: 'domain.fake',
  parentProviderId: undefined,
  sentence: 'sentence',
  url: 'url',
  users: [UserMock.response1, UserMock.response2],
};

const providerResponseMock1: ProviderResponse = {
  id: 'providerFakeId',
  active: true,
  domainName: 'domain.fake',
  parentProviderId: undefined,
  sentence: 'sentence',
  url: 'url',
};

const providerResponseMock2: ProviderResponse = {
  id: 'providerFakeId',
  active: true,
  domainName: 'domain.fake',
  parentProviderId: undefined,
  sentence: 'sentence',
  url: 'url',
};

export class ProviderMock {
  static get entityWithUsers1(): ProviderEntity {
    return providerEntityWithUsersMock1;
  }

  static get entity1(): ProviderEntity {
    return providerEntityMock2;
  }

  static get dtoWithUsers1(): CreateProviderRequest {
    return providerWithUsersDtoMock1;
  }

  static get dto1(): CreateProviderRequest {
    return providerDtoMock1;
  }

  static get response1(): ProviderResponse {
    return providerResponseMock1;
  }

  static get response2(): ProviderResponse {
    return providerResponseMock2;
  }

  static get responseWithUsers1(): ProviderResponse {
    return providerResponseWithUsersMock1;
  }
}
