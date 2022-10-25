import { Tokens } from '../../../../shared-module/application/interfaces/tokens.interface';
import { UserResponse } from './user.response';

export interface RefreshTokenResponse {
  user: UserResponse;
  tokens: Tokens;
}
