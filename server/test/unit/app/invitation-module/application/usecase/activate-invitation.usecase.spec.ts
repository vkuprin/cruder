import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import InvitationRepository from '../../../../../../src/app/invitation-module/secondary-adapters/invitation.repository';
import { InvitationMock } from '../../../../mocks/invitation/invitation.mock';
import { UserMock } from '../../../../mocks/user/user.mock';
import { BadRequestException, GoneException } from '@nestjs/common';
import { ActivateUserUsecase } from '../../../../../../src/app/user-module/application/usecase/external/activate-user.usecase';
import { ActivateInvitationUsecase } from '../../../../../../src/app/invitation-module/application/usecase/internal/activate-invitation.usecase';

chai.use(chaiAsPromised);
chai.should();

describe('activate-invitation.usecase', () => {
  let invitationRepository: InvitationRepository;
  let activateUserUsecase: ActivateUserUsecase;
  let activateInvitationUsecase: ActivateInvitationUsecase;
  let privateMethods: any;

  beforeEach(() => {
    invitationRepository = new InvitationRepository();
    activateUserUsecase = new ActivateUserUsecase({} as any);
    activateInvitationUsecase = new ActivateInvitationUsecase(
      invitationRepository,
      activateUserUsecase,
    );
    privateMethods = activateInvitationUsecase;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('# execute', () => {
    it('should activate user', async () => {
      const invitationEntityMock1 = InvitationMock.entity1;
      const userResponse1 = UserMock.response1;
      invitationEntityMock1.accepted = false;

      const findOneMock = jest
        .spyOn(invitationRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(invitationEntityMock1));
      const removeOneMock = jest
        .spyOn(invitationRepository, 'removeOne')
        .mockImplementation(() => Promise.resolve([invitationEntityMock1]));
      const activateUserMock = jest
        .spyOn(activateUserUsecase, 'execute')
        .mockImplementation(() => Promise.resolve(userResponse1));

      const res = await activateInvitationUsecase.execute('fakeKey');
      expect(res).toEqual(undefined);
      expect(findOneMock.mock.calls.length).toBe(1);
      expect(removeOneMock.mock.calls.length).toBe(1);
      expect(activateUserMock.mock.calls.length).toBe(1);
    });

    it('should throw error if invitation was already accepted', async () => {
      const invitationEntityMock1 = InvitationMock.entity1;
      const userResponse1 = UserMock.response1;
      invitationEntityMock1.accepted = true;

      const findOneMock = jest
        .spyOn(invitationRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(invitationEntityMock1));
      const removeOneMock = jest
        .spyOn(invitationRepository, 'removeOne')
        .mockImplementation(() => Promise.resolve([invitationEntityMock1]));
      const activateUserMock = jest
        .spyOn(activateUserUsecase, 'execute')
        .mockImplementation(() => Promise.resolve(userResponse1));

      await activateInvitationUsecase
        .execute('fakeKey')
        .should.eventually.be.rejectedWith(BadRequestException);
      expect(findOneMock.mock.calls.length).toBe(1);
      expect(removeOneMock.mock.calls.length).toBe(0);
      expect(activateUserMock.mock.calls.length).toBe(0);
    });

    it('should throw error if invitation expired', async () => {
      const invitationEntityMock1 = InvitationMock.entity1;
      const userResponse1 = UserMock.response1;
      invitationEntityMock1.accepted = false;

      const isExpiredMock = jest
        .spyOn(privateMethods, 'isExpired')
        .mockImplementation(() => true);
      const findOneMock = jest
        .spyOn(invitationRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(invitationEntityMock1));
      const removeOneMock = jest
        .spyOn(invitationRepository, 'removeOne')
        .mockImplementation(() => Promise.resolve([invitationEntityMock1]));
      const activateUserMock = jest
        .spyOn(activateUserUsecase, 'execute')
        .mockImplementation(() => Promise.resolve(userResponse1));

      await activateInvitationUsecase
        .execute('fakeKey')
        .should.eventually.be.rejectedWith(GoneException);
      expect(findOneMock.mock.calls.length).toBe(1);
      expect(removeOneMock.mock.calls.length).toBe(1);
      expect(isExpiredMock.mock.calls.length).toBe(1);
      expect(activateUserMock.mock.calls.length).toBe(0);
    });
  });
});
