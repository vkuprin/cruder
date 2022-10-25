import { UserTypeService } from '../../../../src/app/user-type-module/user-type.service';
import { UserTypeController } from '../../../../../src/app/user-type-module/primary-adapters/user-type.controller';
import { UserTypeMock } from '../../../mocks/user/user-type.mock';

describe('UserTypeController', () => {
  let userTypeController: UserTypeController;
  let userTypeService: UserTypeService;

  beforeEach(() => {
    userTypeService = new UserTypeService({} as any);
    userTypeController = new UserTypeController(userTypeService);
  });

  describe('# create', () => {
    it('should return created user type entity', async () => {
      const userTypeEntityMock1 = UserTypeMock.entity1;
      const userTypeDtoMock1 = UserTypeMock.dto1;
      const userTypeResponseMock1 = UserTypeMock.response1;

      const createMock = jest
        .spyOn(userTypeService, 'create')
        .mockImplementation(() => Promise.resolve(userTypeEntityMock1));

      const res = await userTypeController.create({} as any, userTypeDtoMock1);

      expect(res).toEqual(userTypeResponseMock1);
      expect(createMock.mock.calls.length).toBe(1);
    });
  });

  describe('# getAll', () => {
    it('should return all user type entities', async () => {
      const userTypeEntityMock1 = UserTypeMock.entity1;
      const userTypeEntityMock2 = UserTypeMock.entity2;
      const userTypeResponseMock1 = UserTypeMock.response1;
      const userTypeResponseMock2 = UserTypeMock.response2;

      const getAllMock = jest
        .spyOn(userTypeService, 'getAll')
        .mockImplementation(() =>
          Promise.resolve([userTypeEntityMock1, userTypeEntityMock2]),
        );

      const res = await userTypeController.getAll();

      expect(res).toEqual([userTypeResponseMock1, userTypeResponseMock2]);
      expect(getAllMock.mock.calls.length).toBe(1);
    });
  });

  describe('# delete', () => {
    it('should delete user type entity', async () => {
      const deleteMock = jest
        .spyOn(userTypeService, 'delete')
        .mockImplementation(() => Promise.resolve());

      const res = await userTypeController.delete('fakeName');

      expect(res).toEqual(undefined);
      expect(deleteMock.mock.calls.length).toBe(1);
    });
  });
});
