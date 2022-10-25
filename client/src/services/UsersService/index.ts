import {
  getApiData, postApiData, putApiData, deleteApiData,
} from '../../utils/api';
import { usersURI } from '../../constants/endpoints';
import { SignUpRequestI } from '../../types/users.interface';

const UsersService = {
  async getUsers() {
    return getApiData(
      usersURI,
      '',
    );
  },
  async updateUser(id: string | undefined, body: any) {
    return putApiData(
      `${usersURI}/${id}`,
      body,
      '',
    );
  },
  async getSpecificUser(id: string | undefined) {
    return getApiData(
      `${usersURI}/${id}`,
      '',
    );
  },
  async createUser(body: SignUpRequestI) {
    return postApiData(
      `${usersURI}/signUp`,
      body,
      '',
    );
  },
  async deleteUser(id: string) {
    return deleteApiData(
      `${usersURI}/${id}`,
      '',
    );
  },
};

export default UsersService;
