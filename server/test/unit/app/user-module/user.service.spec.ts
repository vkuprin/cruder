import { cloneDeep } from 'lodash';
import { UserService } from '../../../../src/app/user-module/user.service';
import UserRepository from '../../../../src/app/user-module/secondary-adapters/user.repository';
import { InvitationService } from '../../../../src/app/invitation-module/invitation.service';
import { UserTypeService } from '../../../../src/app/user-type-module/user-type.service';
import { UserMock } from '../../mocks/user/user.mock';
import { UserTypeMock } from '../../mocks/user/user-type.mock';
import { InvitationMock } from '../../mocks/invitation/invitation.mock';
import { KafkaService } from '../../../../src/infrastructure/services/kafka.service';
import { ProviderService } from '../../../../src/app/provider-module/provider.service';
import { AuthService } from '../../../../src/app/shared-module/application/services/auth.service';

describe('UserService', () => {
  let userRepository: UserRepository;
  let userTypeService: UserTypeService;
  let userService: UserService;
  let authService: AuthService;
  let providerService: ProviderService;
  let invitationService: InvitationService;

  beforeEach(() => {
    userRepository = new UserRepository();
    userTypeService = new UserTypeService({} as any);
    invitationService = new InvitationService({} as any, {} as any);
    authService = new AuthService();
    providerService = new ProviderService(
      {} as any,
      {} as any,
      {} as any,
      {} as any,
    );
    userService = new UserService(
      userRepository,
      userTypeService,
      invitationService,
      authService,
      providerService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('# signUp', () => {
    it('should create user and send invitation', async () => {
      const userEntityMock1 = UserMock.entity1;
      const userTypeEntityMock1 = UserTypeMock.entity1;
      const invitationEntityMock1 = InvitationMock.entity1;
      const userDtoMock1 = UserMock.dto1;
      userEntityMock1.active = false;

      const userTypeGetOneMock = jest
        .spyOn(userTypeService, 'getOne')
        .mockImplementation(() => Promise.resolve(userTypeEntityMock1));
      const storeMock = jest
        .spyOn(userRepository, 'store')
        .mockImplementation(() => Promise.resolve(userEntityMock1));
      const invitationCreateMock = jest
        .spyOn(invitationService, 'create')
        .mockImplementation(() => Promise.resolve(invitationEntityMock1));
      const sendMessageMock = jest
        .spyOn(KafkaService, 'sendMessage')
        .mockImplementation();

      const res = await userService.signUp(userDtoMock1);

      expect(storeMock.mock.calls.length).toBe(1);
      expect(sendMessageMock.mock.calls.length).toBe(2);
      expect(invitationCreateMock.mock.calls.length).toBe(1);
      expect(userTypeGetOneMock.mock.calls.length).toBe(1);
      expect(res).toEqual(userEntityMock1);
    });

    it('should create user and dont send invitation', async () => {
      const userEntityMock1 = UserMock.entity1;
      const userTypeEntityMock1 = UserTypeMock.entity1;
      const userDtoMock1 = UserMock.dto1;
      userEntityMock1.active = true;

      const userTypeGetOneMock = jest
        .spyOn(userTypeService, 'getOne')
        .mockImplementation(() => Promise.resolve(userTypeEntityMock1));
      const storeMock = jest
        .spyOn(userRepository, 'store')
        .mockImplementation(() => Promise.resolve(userEntityMock1));
      const sendMessageMock = jest
        .spyOn(KafkaService, 'sendMessage')
        .mockImplementation();
      const invitationCreateMock = jest
        .spyOn(invitationService, 'create')
        .mockImplementation();

      const res = await userService.signUp(userDtoMock1);

      expect(storeMock.mock.calls.length).toBe(1);
      expect(sendMessageMock.mock.calls.length).toBe(1);
      expect(invitationCreateMock.mock.calls.length).toBe(0);
      expect(userTypeGetOneMock.mock.calls.length).toBe(1);
      expect(res).toEqual(userEntityMock1);
    });
  });

  describe('# activateUser', () => {
    it('should activate user if not activated yet', async () => {
      const userEntityMock1 = UserMock.entity1;

      const userEntityCopyActivated = cloneDeep(userEntityMock1);
      const userEntityCopyNotActivated = cloneDeep(userEntityMock1);
      userEntityCopyActivated.active = true;
      userEntityCopyNotActivated.active = false;

      const getByIdMock = jest
        .spyOn(userRepository, 'getById')
        .mockImplementation(() => Promise.resolve(userEntityCopyNotActivated));
      const storeMock = jest
        .spyOn(userRepository, 'store')
        .mockImplementation(() => Promise.resolve(userEntityCopyActivated));

      const res = await userService.activateUser('fakeId');

      expect(storeMock.mock.calls.length).toBe(1);
      expect(getByIdMock.mock.calls.length).toBe(1);
      expect(res).toEqual(userEntityCopyActivated);
    });

    it('should not activate user if already activated', async () => {
      const userEntityMock1 = UserMock.entity1;
      userEntityMock1.active = true;

      const getByIdMock = jest
        .spyOn(userRepository, 'getById')
        .mockImplementation(() => Promise.resolve(userEntityMock1));
      const storeMock = jest
        .spyOn(userRepository, 'store')
        .mockImplementation();

      const res = await userService.activateUser('fakeId');

      expect(getByIdMock.mock.calls.length).toBe(1);
      expect(storeMock.mock.calls.length).toBe(0);
      expect(res).toEqual(userEntityMock1);
    });
  });

  describe('# getUser', () => {
    it('should return created user', async () => {
      const userEntityMock1 = UserMock.entity1;

      const getByIdMock = jest
        .spyOn(userRepository, 'getById')
        .mockImplementation(() => Promise.resolve(userEntityMock1));

      const res = await userService.getUser('fakeId');

      expect(getByIdMock.mock.calls.length).toBe(1);
      expect(res).toEqual(userEntityMock1);
    });
  });
});
