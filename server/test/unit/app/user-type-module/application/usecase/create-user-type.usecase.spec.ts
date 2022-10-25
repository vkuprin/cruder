import UserTypeRepository from '../../../../../../src/app/user-type-module/secondary-adapters/user-type.repository';
import { UserTypeMock } from '../../../../mocks/user/user-type.mock';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import { CreateUserTypeUsecase } from '../../../../../../src/app/user-type-module/application/usecase/internal/create-user-type.usecase';

chai.use(chaiAsPromised);
chai.should();

describe('create-user-type.usecase', () => {
  let userTypeRepository: UserTypeRepository;
  let createUserTypeUsecase: CreateUserTypeUsecase;

  beforeEach(() => {
    userTypeRepository = new UserTypeRepository();
    createUserTypeUsecase = new CreateUserTypeUsecase(userTypeRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('# execute', () => {
    it('should create user type', async () => {
      const userTypeEntity1 = UserTypeMock.entity1;
      const userTypeResponse1 = UserTypeMock.response1;
      const createUserTypeRequest1 = UserTypeMock.createUserTypeRequest1;

      const saveMock = jest
        .spyOn(userTypeRepository, 'save')
        .mockImplementation(() => Promise.resolve(userTypeEntity1));

      const res = await createUserTypeUsecase.execute(createUserTypeRequest1);
      expect(res).toEqual(userTypeResponse1);
      expect(saveMock.mock.calls.length).toBe(1);
    });
  });
});
