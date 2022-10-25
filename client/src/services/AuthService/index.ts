import { postApiData } from '../../utils/api';
import { signInURI } from '../../constants/endpoints';

interface AuthServiceType {
    email: string;
    password: string;
}

const AuthService = {
  async postSignIn({ email, password }: AuthServiceType) {
    if (!password) return;
    return await postApiData(
      signInURI,
      {
        email,
        password,
      },
      '',
    );
  },
};

export default AuthService;
