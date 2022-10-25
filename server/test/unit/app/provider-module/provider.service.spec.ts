import * as typeorm from 'typeorm';
import { UserTypeService } from '../../../../src/app/user-type-module/user-type.service';
import { UserMock } from '../../mocks/user/user.mock';
import { InvitationMock } from '../../mocks/invitation/invitation.mock';
import { ProviderService } from '../../../../src/app/provider-module/provider.service';
import ProviderRepository from '../../../../src/app/provider-module/secondary-adapters/provider.repository';
import { InvitationService } from '../../../../src/app/invitation-module/invitation.service';
import { ProviderMock } from '../../mocks/provider/provider.mock';
import { UserTypeMock } from '../../mocks/user/user-type.mock';
import { KafkaTopics } from '../../../../src/app/config/kafka.config';
import { KafkaService } from '../../../../src/infrastructure/services/kafka.service';
import { EmailType } from '../../../../src/app/shared-module/application/enums/email-type.enum';
import { UserService } from '../../../../src/app/user-module/user.service';

describe('ProviderService', () => {
  let providerService: ProviderService;
  let privateService: any;
  let providerRepository: ProviderRepository;
  let userTypeService: UserTypeService;
  let userService: UserService;
  let invitationService: InvitationService;

  beforeEach(() => {
    providerRepository = new ProviderRepository();
    userTypeService = new UserTypeService({} as any);
    invitationService = new InvitationService({} as any, {} as any);
    userService = new UserService(
      {} as any,
      {} as any,
      {} as any,
      {} as any,
      {} as any,
    );
    providerService = new ProviderService(
      providerRepository,
      userTypeService,
      userService,
      invitationService,
    );
    privateService = providerService;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('# create', () => {
    it('should create provider without users', async () => {
      const providerEntityMock1 = ProviderMock.entity1;
      const providerDtoMock1 = ProviderMock.dto1;

      const saveProviderMock = jest
        .spyOn(privateService, 'saveProvider')
        .mockImplementation(() => Promise.resolve(providerEntityMock1));
      const executeTransactionMock = jest
        .spyOn(privateService, 'executeTransactionAndSendInvitations')
        .mockImplementation();

      const res = await providerService.create(providerDtoMock1);

      expect(saveProviderMock.mock.calls.length).toBe(1);
      expect(executeTransactionMock.mock.calls.length).toBe(0);
      expect(res).toEqual([providerEntityMock1, undefined]);
    });

    it('should create provider with users', async () => {
      const providerDtoWithUsersMock1 = ProviderMock.dtoWithUsers1;

      const saveProviderMock = jest
        .spyOn(privateService, 'saveProvider')
        .mockImplementation();

      const executeTransactionMock = jest
        .spyOn(privateService, 'executeTransactionAndSendInvitations')
        .mockImplementation(() =>
          Promise.resolve([
            providerDtoWithUsersMock1,
            providerDtoWithUsersMock1.users,
          ]),
        );

      const res = await providerService.create(providerDtoWithUsersMock1);

      expect(saveProviderMock.mock.calls.length).toBe(0);
      expect(executeTransactionMock.mock.calls.length).toBe(1);
      expect(res).toEqual([
        providerDtoWithUsersMock1,
        providerDtoWithUsersMock1.users,
      ]);
    });
  });

  describe('# saveProvider', () => {
    it('should create provider entity', async () => {
      const providerEntityMock1 = ProviderMock.entity1;
      const providerDtoMock1 = ProviderMock.dto1;

      const storeProviderMock = jest
        .spyOn(providerRepository, 'store')
        .mockImplementation(() => Promise.resolve(providerEntityMock1));

      const res = await privateService.saveProvider(providerDtoMock1);

      expect(storeProviderMock.mock.calls.length).toBe(1);
      expect(res).toEqual(providerEntityMock1);
    });
  });

  describe('# sendUserInvitations', () => {
    it('should send two email invitation for two inactive users', async () => {
      const inactiveUserEntityMock1 = UserMock.entity1;
      const inactiveUserEntityMock2 = UserMock.entity2;
      inactiveUserEntityMock1.active = false;
      inactiveUserEntityMock2.active = false;

      const invitationEntityMock1 = InvitationMock.entity1;
      const invitationEntityMock2 = InvitationMock.entity1;
      invitationEntityMock1.user = inactiveUserEntityMock1;
      invitationEntityMock2.user = inactiveUserEntityMock2;

      const createInvitationMock = jest
        .spyOn(invitationService, 'create')
        .mockImplementationOnce(() => Promise.resolve(invitationEntityMock1))
        .mockImplementationOnce(() => Promise.resolve(invitationEntityMock2));

      const sendMessageMock = jest
        .spyOn(KafkaService, 'sendMessage')
        .mockImplementation();

      await privateService.sendUserInvitations([
        inactiveUserEntityMock1,
        inactiveUserEntityMock2,
      ]);

      expect(createInvitationMock.mock.calls[0]).toEqual([
        { userId: inactiveUserEntityMock1.id },
      ]);
      expect(createInvitationMock.mock.calls[1]).toEqual([
        { userId: inactiveUserEntityMock2.id },
      ]);
      expect(createInvitationMock.mock.calls.length).toBe(2);
      expect(sendMessageMock.mock.calls.length).toBe(2);
      expect(sendMessageMock.mock.calls[0]).toEqual([
        KafkaTopics.Email,
        {
          userId: inactiveUserEntityMock1.id,
          email: inactiveUserEntityMock1.email,
          key: invitationEntityMock1.key,
          type: EmailType.activateUser,
        },
      ]);
      expect(sendMessageMock.mock.calls[1]).toEqual([
        KafkaTopics.Email,
        {
          userId: inactiveUserEntityMock2.id,
          email: inactiveUserEntityMock2.email,
          key: invitationEntityMock2.key,
          type: EmailType.activateUser,
        },
      ]);
    });

    it('should send one email invitation for one inactive user and one already active', async () => {
      const activeUserEntityMock1 = UserMock.entity1;
      const inactiveUserEntityMock2 = UserMock.entity2;
      activeUserEntityMock1.active = true;
      inactiveUserEntityMock2.active = false;

      const invitationEntityMock = InvitationMock.entity1;
      invitationEntityMock.user = inactiveUserEntityMock2;

      const createInvitationMock = jest
        .spyOn(invitationService, 'create')
        .mockImplementationOnce(() => Promise.reject())
        .mockImplementationOnce(() => Promise.resolve(invitationEntityMock));

      const sendMessageMock = jest
        .spyOn(KafkaService, 'sendMessage')
        .mockImplementation();

      await privateService.sendUserInvitations([
        activeUserEntityMock1,
        inactiveUserEntityMock2,
      ]);

      expect(createInvitationMock.mock.calls[0]).toEqual([
        { userId: activeUserEntityMock1.id },
      ]);
      expect(createInvitationMock.mock.calls[1]).toEqual([
        { userId: inactiveUserEntityMock2.id },
      ]);
      expect(createInvitationMock.mock.calls.length).toBe(2);
      expect(sendMessageMock.mock.calls.length).toBe(1);
      expect(sendMessageMock.mock.calls[0]).toEqual([
        KafkaTopics.Email,
        {
          userId: inactiveUserEntityMock2.id,
          email: inactiveUserEntityMock2.email,
          key: invitationEntityMock.key,
          type: EmailType.activateUser,
        },
      ]);
    });

    it('should not send email invitations for two active users', async () => {
      const activeUserEntityMock1 = UserMock.entity1;
      const activeUserEntityMock2 = UserMock.entity2;
      activeUserEntityMock1.active = true;
      activeUserEntityMock2.active = true;

      const createInvitationMock = jest
        .spyOn(invitationService, 'create')
        .mockImplementationOnce(() => Promise.reject())
        .mockImplementationOnce(() => Promise.reject());

      const sendMessageMock = jest
        .spyOn(KafkaService, 'sendMessage')
        .mockImplementation();

      await privateService.sendUserInvitations([
        activeUserEntityMock1,
        activeUserEntityMock2,
      ]);

      expect(createInvitationMock.mock.calls[0]).toEqual([
        { userId: activeUserEntityMock1.id },
      ]);
      expect(createInvitationMock.mock.calls[1]).toEqual([
        { userId: activeUserEntityMock2.id },
      ]);
      expect(createInvitationMock.mock.calls.length).toBe(2);
      expect(sendMessageMock.mock.calls.length).toBe(0);
    });
  });

  describe('# executeTransactionAndSendInvitations', () => {
    it('should create provider and two users', async () => {
      const providerWithUsersDtoMock1 = ProviderMock.dtoWithUsers1;
      const providerWithUsersEntityMock1 = ProviderMock.entityWithUsers1;
      const usersEntitiesMock = [UserMock.entity1, UserMock.entity2];
      const fakeManager: any = {
        transaction: jest
          .fn()
          .mockImplementation(() =>
            Promise.resolve([providerWithUsersEntityMock1, usersEntitiesMock]),
          ),
      };

      const getManagerMock = jest
        .spyOn(typeorm, 'getManager')
        .mockImplementation(() => fakeManager);

      const sendUserInvitationsMock = jest
        .spyOn(privateService, 'sendUserInvitations')
        .mockImplementation();

      const res = await privateService.executeTransactionAndSendInvitations(
        providerWithUsersDtoMock1,
      );

      expect(getManagerMock.mock.calls.length).toBe(1);
      expect(sendUserInvitationsMock.mock.calls.length).toBe(1);
      expect(sendUserInvitationsMock.mock.calls[0]).toEqual([
        usersEntitiesMock,
      ]);
      expect(res).toEqual([providerWithUsersEntityMock1, usersEntitiesMock]);
    });

    it('should create only provider', async () => {
      const providerDtoMock1 = ProviderMock.dto1;
      const providerEntityMock1 = ProviderMock.entity1;
      const fakeManager: any = {
        transaction: jest
          .fn()
          .mockImplementation(() =>
            Promise.resolve([providerEntityMock1, undefined]),
          ),
      };

      const getManagerMock = jest
        .spyOn(typeorm, 'getManager')
        .mockImplementation(() => fakeManager);

      const sendUserInvitationsMock = jest
        .spyOn(privateService, 'sendUserInvitations')
        .mockImplementation();

      const res = await privateService.executeTransactionAndSendInvitations(
        providerDtoMock1,
      );

      expect(getManagerMock.mock.calls.length).toBe(1);
      expect(sendUserInvitationsMock.mock.calls.length).toBe(1);
      expect(sendUserInvitationsMock.mock.calls[0]).toEqual([undefined]);
      expect(res).toEqual([providerEntityMock1, undefined]);
    });
  });

  describe('# saveProviderWithUsersTransaction', () => {
    it('should create provider and two users without errors', async () => {
      const userTypeEntity1 = UserTypeMock.entity1;
      const userTypeEntity2 = UserTypeMock.entity2;

      const providerWithUsersDtoMock1 = ProviderMock.dtoWithUsers1;
      const providerDtoMock1 = ProviderMock.dto1;
      const providerEntityMock1 = ProviderMock.entity1;
      const userEntityMock1 = UserMock.entity1;
      const userEntityMock2 = UserMock.entity2;
      const userDtoMock1 = UserMock.dto1;
      const userDtoMock2 = UserMock.dto2;

      const usersEntitiesMock = [userEntityMock1, userEntityMock2];
      const fakeManager: any = {
        save: jest.fn(),
      };

      fakeManager.save
        .mockImplementationOnce(() => Promise.resolve(providerEntityMock1))
        .mockImplementationOnce(() => Promise.resolve(userEntityMock1))
        .mockImplementationOnce(() => Promise.resolve(userEntityMock2));

      const getOneUserTypeMock = jest
        .spyOn(userTypeService, 'getOne')
        .mockImplementationOnce(() => Promise.resolve(userTypeEntity1))
        .mockImplementationOnce(() => Promise.resolve(userTypeEntity2));

      const res = await privateService.saveProviderWithUsersTransaction(
        providerWithUsersDtoMock1,
        fakeManager,
      );

      expect(getOneUserTypeMock.mock.calls.length).toBe(2);
      expect(getOneUserTypeMock.mock.calls[0]).toEqual([userDtoMock1.userType]);
      expect(getOneUserTypeMock.mock.calls[1]).toEqual([userDtoMock2.userType]);
      expect(fakeManager.save.mock.calls.length).toBe(3);
      expect(fakeManager.save.mock.calls[0]).toEqual([providerDtoMock1]);

      expect(res).toEqual([providerEntityMock1, usersEntitiesMock]);
    });
  });

  describe('# getListOfProviders', () => {
    it('should return list of providers', async () => {
      const providerEntity1 = ProviderMock.entity1;
      const providerEntity2 = ProviderMock.entity1;

      const getMock = jest
        .spyOn(providerRepository, 'get')
        .mockImplementation(() =>
          Promise.resolve([providerEntity1, providerEntity2]),
        );

      const res = await providerService.getListOfProviders();

      expect(res).toEqual([providerEntity1, providerEntity2]);
      expect(getMock.mock.calls.length).toBe(1);
    });
  });
});
