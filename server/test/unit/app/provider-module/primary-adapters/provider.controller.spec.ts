import { ProviderService } from '../../../../src/app/provider-module/provider.service';
import { ProviderController } from '../../../../../src/app/provider-module/primary-adapters/provider.controller';
import { ProviderMock } from '../../../mocks/provider/provider.mock';

describe('ProviderController', () => {
  let providerController: ProviderController;
  let providerService: ProviderService;

  beforeEach(() => {
    providerService = new ProviderService(
      {} as any,
      {} as any,
      {} as any,
      {} as any,
    );
    providerController = new ProviderController(providerService);
  });

  describe('# create', () => {
    it('should return created provider without users', async () => {
      const providerEntityMock1 = ProviderMock.entity1;
      const providerDtoMock1 = ProviderMock.dto1;
      const providerResponseMock1 = ProviderMock.response1;

      const createMock = jest
        .spyOn(providerService, 'create')
        .mockImplementation(() =>
          Promise.resolve([providerEntityMock1, undefined]),
        );

      const res = await providerController.create({} as any, providerDtoMock1);

      expect(res).toEqual(providerResponseMock1);
      expect(createMock.mock.calls.length).toBe(1);
    });

    it('should return created provider with users', async () => {
      const providerEntityMock1 = ProviderMock.entityWithUsers1;
      const providerDtoMock1 = ProviderMock.dtoWithUsers1;
      const providerResponseMock1 = ProviderMock.responseWithUsers1;

      const createMock = jest
        .spyOn(providerService, 'create')
        .mockImplementation(() =>
          Promise.resolve([providerEntityMock1, providerEntityMock1.users]),
        );

      const res = await providerController.create({} as any, providerDtoMock1);

      expect(res).toEqual(providerResponseMock1);
      expect(createMock.mock.calls.length).toBe(1);
    });
  });

  describe('# getListOfProviders', () => {
    it('should return list of providers', async () => {
      const providerEntity1 = ProviderMock.entity1;
      const providerEntity2 = ProviderMock.entity1;
      const providerResponse1 = ProviderMock.response2;
      const providerResponse2 = ProviderMock.response2;

      const getListMock = jest
        .spyOn(providerService, 'getListOfProviders')
        .mockImplementation(() =>
          Promise.resolve([providerEntity1, providerEntity2]),
        );

      const res = await providerController.getListOfProviders();

      expect(getListMock.mock.calls.length).toBe(1);
      expect(res).toEqual([providerResponse1, providerResponse2]);
    });
  });
});
