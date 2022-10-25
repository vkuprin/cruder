import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import InvitationRepository from '../../../../../../src/app/invitation-module/secondary-adapters/invitation.repository';
import { InvitationMock } from '../../../../mocks/invitation/invitation.mock';
import { GetInvitationsListUsecase } from '../../../../../../src/app/invitation-module/application/usecase/internal/get-invitations-list.usecase';

chai.use(chaiAsPromised);
chai.should();

describe('get-invitations-list.usecase', () => {
  let invitationRepository: InvitationRepository;
  let getInvitationsListUsecase: GetInvitationsListUsecase;

  beforeEach(() => {
    invitationRepository = new InvitationRepository();
    getInvitationsListUsecase = new GetInvitationsListUsecase(
      invitationRepository,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('# execute', () => {
    it('should return invitations list', async () => {
      const invitationEntityMock1 = InvitationMock.entity1;
      const invitationResponse1 = InvitationMock.response1;

      const findMock = jest
        .spyOn(invitationRepository, 'find')
        .mockImplementation(() => Promise.resolve([invitationEntityMock1]));

      const res = await getInvitationsListUsecase.execute();
      expect(res).toEqual([invitationResponse1]);
      expect(findMock.mock.calls.length).toBe(1);
    });

    it('should return empty array', async () => {
      const findMock = jest
        .spyOn(invitationRepository, 'find')
        .mockImplementation(() => Promise.resolve([]));

      const res = await getInvitationsListUsecase.execute();
      expect(res).toEqual([]);
      expect(findMock.mock.calls.length).toBe(1);
    });
  });
});
