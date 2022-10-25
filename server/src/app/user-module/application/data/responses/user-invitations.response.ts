import { UserResponse } from './user.response';
import { InvitationResponse } from '../../../../invitation-module/application/data/responses/invitation.response';

export interface UserInvitationsResponse {
  user: UserResponse;
  invitations: InvitationResponse[];
}
