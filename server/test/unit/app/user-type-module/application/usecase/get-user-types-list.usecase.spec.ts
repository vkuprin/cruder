import UserTypeRepository from '../../../../../../src/app/user-type-module/secondary-adapters/user-type.repository';
import { GetUserTypesListUsecase } from '../../../../../../src/app/user-type-module/application/usecase/internal/get-user-types-list.usecase';
import { UserTypeMock } from '../../../../mocks/user/user-type.mock';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';

chai.use(chaiAsPromised);
chai.should();

describe('get-user-types-list.usecase', () => {
  let userTypeRepository: UserTypeRepository;
  let getUserTypesListUsecase: GetUserTypesListUsecase;

  beforeEach(() => {
    userTypeRepository = new UserTypeRepository();
    getUserTypesListUsecase = new GetUserTypesListUsecase(userTypeRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('# execute', () => {
    it('should return user types list', async () => {
      const userTypeEntity1 = UserTypeMock.entity1;
      const userTypeEntity2 = UserTypeMock.entity2;
      const userTypeResponse1 = UserTypeMock.response1;
      const userTypeResponse2 = UserTypeMock.response2;

      const findMock = jest
        .spyOn(userTypeRepository, 'find')
        .mockImplementation(() =>
          Promise.resolve([userTypeEntity1, userTypeEntity2]),
        );

      const res = await getUserTypesListUsecase.execute();
      expect(res).toEqual([userTypeResponse1, userTypeResponse2]);
      expect(findMock.mock.calls.length).toBe(1);
    });

    it('should return empty array', async () => {
      const findMock = jest
        .spyOn(userTypeRepository, 'find')
        .mockImplementation(() => Promise.resolve([]));

      const res = await getUserTypesListUsecase.execute();
      expect(res).toEqual([]);
      expect(findMock.mock.calls.length).toBe(1);
    });
  });
});
