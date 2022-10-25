import UserTypeRepository from '../../../../../../src/app/user-type-module/secondary-adapters/user-type.repository';
import { UserTypeMock } from '../../../../mocks/user/user-type.mock';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import { GetUserTypeByIdUsecase } from '../../../../../../src/app/user-type-module/application/usecase/internal/get-user-type-by-id.usecase';
import { NotFoundException } from '@nestjs/common';

chai.use(chaiAsPromised);
chai.should();

describe('get-user-type-by-id.usecase', () => {
  let userTypeRepository: UserTypeRepository;
  let getUserTypeByIdUsecase: GetUserTypeByIdUsecase;

  beforeEach(() => {
    userTypeRepository = new UserTypeRepository();
    getUserTypeByIdUsecase = new GetUserTypeByIdUsecase(userTypeRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('# execute', () => {
    it('should return user type by id', async () => {
      const userTypeEntity1 = UserTypeMock.entity1;
      const userTypeResponse1 = UserTypeMock.response1;

      const findOneMock = jest
        .spyOn(userTypeRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(userTypeEntity1));

      const res = await getUserTypeByIdUsecase.execute('id');
      expect(res).toEqual(userTypeResponse1);
      expect(findOneMock.mock.calls.length).toBe(1);
    });

    it('should throw NotFoundException if no user type', async () => {
      const findOneMock = jest
        .spyOn(userTypeRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));

      await getUserTypeByIdUsecase
        .execute('id')
        .should.eventually.be.rejectedWith(NotFoundException);

      expect(findOneMock.mock.calls.length).toBe(1);
    });
  });
});
