import {
  getApiData,
  putApiData,
  postApiData,
  deleteApiData,
} from '../../utils/api';
import { userTypesURI } from '../../constants/endpoints';
import { UserTypesI } from '../../types/userTypes.interface';

const UserTypesService = {
  async getUserTypes() {
    return getApiData(
      userTypesURI,
      '',
    );
  },
  async updateUserType(id: string, body: any) {
    return putApiData(
      `${userTypesURI}/${id}`,
      body,
      '',
    );
  },
  async createUserType(body: UserTypesI) {
    return postApiData(
      `${userTypesURI}/`,
      body,
      '',
    );
  },
  async deleteUserType(id: string) {
    return deleteApiData(
      `${userTypesURI}/${id}`,
      '',
    );
  },
};

export default UserTypesService;
