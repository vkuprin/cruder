import UserTypeRepository from '../../../../../../src/app/user-type-module/secondary-adapters/user-type.repository';
import { UserTypeMock } from '../../../../mocks/user/user-type.mock';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserTypeByIdUsecase } from '../../../../../../src/app/user-type-module/application/usecase/internal/update-user-type-by-id.usecase';

chai.use(chaiAsPromised);
chai.should();

describe('update-user-type-by-id.usecase', () => {
  let userTypeRepository: UserTypeRepository;
  let updateUserTypeByIdUsecase: UpdateUserTypeByIdUsecase;

  beforeEach(() => {
    userTypeRepository = new UserTypeRepository();
    updateUserTypeByIdUsecase = new UpdateUserTypeByIdUsecase(
      userTypeRepository,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('# execute', () => {
    it('should update user type by id', async () => {
      const userTypeEntity1 = UserTypeMock.entity1;
      const updateUserTypeRequest = UserTypeMock.updateUserTypeRequest1;
      const updatedEntity1 = UserTypeMock.updatedEntity1;
      const updatedResponse1 = UserTypeMock.updatedResponse1;

      const findOneMock = jest
        .spyOn(userTypeRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(userTypeEntity1));

      const saveMock = jest
        .spyOn(userTypeRepository, 'save')
        .mockImplementation(() => Promise.resolve(updatedEntity1));

      const res = await updateUserTypeByIdUsecase.execute(
        'id',
        updateUserTypeRequest,
      );
      expect(res).toEqual(updatedResponse1);
      expect(findOneMock.mock.calls.length).toBe(1);
      expect(saveMock.mock.calls.length).toBe(1);
    });

    it('should throw NotFoundException if no user type', async () => {
      const userTypeEntity1 = UserTypeMock.entity1;

      const findOneMock = jest
        .spyOn(userTypeRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(undefined));

      const saveMock = jest
        .spyOn(userTypeRepository, 'save')
        .mockImplementation(() => Promise.resolve(userTypeEntity1));

      await updateUserTypeByIdUsecase
        .execute('id', {} as any)
        .should.eventually.be.rejectedWith(NotFoundException);

      expect(findOneMock.mock.calls.length).toBe(1);
      expect(saveMock.mock.calls.length).toBe(0);
    });
  });
});
