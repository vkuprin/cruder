import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import { GetUserByIdUsecase } from '../../../../../../src/app/user-module/application/usecase/internal/get-user-by-id.usecase';
import InvitationRepository from '../../../../../../src/app/invitation-module/secondary-adapters/invitation.repository';
import { CreateInvitationUsecase } from '../../../../../../src/app/invitation-module/application/usecase/internal/create-invitation.usecase';
import { InvitationMock } from '../../../../mocks/invitation/invitation.mock';
import { UserMock } from '../../../../mocks/user/user.mock';
import { GenerateUuidHelper } from '../../../../../../src/app/shared-module/application/utils/generate-uuid.helper';
import { BadRequestException } from '@nestjs/common';

chai.use(chaiAsPromised);
chai.should();

describe('create-invitation.usecase', () => {
  let invitationRepository: InvitationRepository;
  let getUserByIdUsecase: GetUserByIdUsecase;
  let createInvitationUsecase: CreateInvitationUsecase;

  beforeEach(() => {
    invitationRepository = new InvitationRepository();
    getUserByIdUsecase = new GetUserByIdUsecase({} as any);
    createInvitationUsecase = new CreateInvitationUsecase(
      invitationRepository,
      getUserByIdUsecase,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('# execute', () => {
    it('should create invitation entity if user is inactive', async () => {
      const invitationEntityMock1 = InvitationMock.entity1;
      const invitationResponse1 = InvitationMock.response1;
      const createRequestMock1 = InvitationMock.createRequest1;
      const userEntityMock1 = UserMock.entity1;
      userEntityMock1.active = false;

      const getUserUsecaseMock = jest
        .spyOn(getUserByIdUsecase, 'execute')
        .mockImplementation(() => Promise.resolve(userEntityMock1));
      const saveMock = jest
        .spyOn(invitationRepository, 'save')
        .mockImplementation(() => Promise.resolve(invitationEntityMock1));
      const generateMock = jest
        .spyOn(GenerateUuidHelper, 'generate', 'get')
        .mockImplementation(() => invitationEntityMock1.key);

      const res = await createInvitationUsecase.execute(createRequestMock1);
      expect(res).toEqual(invitationResponse1);
      expect(saveMock.mock.calls.length).toBe(1);
      expect(getUserUsecaseMock.mock.calls.length).toBe(1);
      expect(generateMock.mock.calls.length).toBe(1);
    });

    it('should throw error if user is already active', async () => {
      const invitationEntityMock1 = InvitationMock.entity1;
      const createInvitationMock1 = InvitationMock.createRequest1;
      const userEntityMock1 = UserMock.entity1;
      userEntityMock1.active = true;

      const getUserUsecaseMock = jest
        .spyOn(getUserByIdUsecase, 'execute')
        .mockImplementation(() => Promise.resolve(userEntityMock1));
      const saveMock = jest
        .spyOn(invitationRepository, 'save')
        .mockImplementation(() => Promise.resolve(invitationEntityMock1));
      const generateMock = jest
        .spyOn(GenerateUuidHelper, 'generate', 'get')
        .mockImplementation(() => invitationEntityMock1.key);

      await createInvitationUsecase
        .execute(createInvitationMock1)
        .should.eventually.be.rejectedWith(BadRequestException);

      expect(getUserUsecaseMock.mock.calls.length).toBe(1);
      expect(generateMock.mock.calls.length).toBe(0);
      expect(saveMock.mock.calls.length).toBe(0);
    });
  });
});
