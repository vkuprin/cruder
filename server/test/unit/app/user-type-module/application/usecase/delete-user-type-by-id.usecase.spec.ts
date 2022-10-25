import UserTypeRepository from '../../../../../../src/app/user-type-module/secondary-adapters/user-type.repository';
import { UserTypeMock } from '../../../../mocks/user/user-type.mock';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import { NotFoundException } from '@nestjs/common';
import { DeleteUserTypeByIdUsecase } from '../../../../../../src/app/user-type-module/application/usecase/internal/delete-user-type-by-id.usecase';

chai.use(chaiAsPromised);
chai.should();

describe('delete-user-type-by-id.usecase', () => {
  let userTypeRepository: UserTypeRepository;
  let deleteUserTypeByIdUsecase: DeleteUserTypeByIdUsecase;

  beforeEach(() => {
    userTypeRepository = new UserTypeRepository();
    deleteUserTypeByIdUsecase = new DeleteUserTypeByIdUsecase(
      userTypeRepository,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('# execute', () => {
    it('should remove user type by id', async () => {
      const userTypeEntity1 = UserTypeMock.entity1;

      const findOneMock = jest
        .spyOn(userTypeRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(userTypeEntity1));

      const removeOneMock = jest
        .spyOn(userTypeRepository, 'removeOne')
        .mockImplementation(() => Promise.resolve([userTypeEntity1]));

      const res = await deleteUserTypeByIdUsecase.execute('id');
      expect(res).toEqual(undefined);
      expect(findOneMock.mock.calls.length).toBe(1);
      expect(removeOneMock.mock.calls.length).toBe(1);
    });

    it('should throw NotFoundException if no user type', async () => {
      const userTypeEntity1 = UserTypeMock.entity1;

      const findOneMock = jest
        .spyOn(userTypeRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));

      await deleteUserTypeByIdUsecase
        .execute('id')
        .should.eventually.be.rejectedWith(NotFoundException);

      const removeOneMock = jest
        .spyOn(userTypeRepository, 'removeOne')
        .mockImplementation(() => Promise.resolve([userTypeEntity1]));

      expect(findOneMock.mock.calls.length).toBe(1);
      expect(removeOneMock.mock.calls.length).toBe(0);
    });
  });
});
