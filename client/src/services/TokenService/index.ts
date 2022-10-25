import { postApiData } from '../../utils/api';
import { tokenRefreshURI } from '../../constants/endpoints';

const TokenService = {
  async postTokenRefresh(token: string) {
    if (!token) return;
    return await postApiData(tokenRefreshURI, {
      refreshToken: token,
    }, '');
  },
};

export default TokenService;
