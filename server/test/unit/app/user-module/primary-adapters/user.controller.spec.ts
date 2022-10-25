import { UserController } from '../../../../../src/app/user-module/primary-adapters/user.controller';
import { UserService } from '../../../../src/app/user-module/user.service';
import { UserAdapter } from '../../../../src/app/user-module/user.adapter';
import { UserMock } from '../../../mocks/user/user.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
    );
    userController = new UserController(userService);
  });

  describe('# signUp', () => {
    it('should return created user', async () => {
      const userEntityMock1 = UserMock.entity1;
      const userDtoMock1 = UserMock.dto1;

      const expectedResponse = UserAdapter.entityToResponse(userEntityMock1);

      const createMock = jest
        .spyOn(userService, 'signUp')
        .mockImplementation(() => Promise.resolve(userEntityMock1));

      const res = await userController.signUp(userDtoMock1);

      expect(res).toEqual(expectedResponse);
      expect(createMock.mock.calls.length).toBe(1);
    });
  });
});
