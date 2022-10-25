import {
  getApiData, postApiData, putApiData, deleteApiData,
} from '../../utils/api';
import { providersURI } from '../../constants/endpoints';
import { ProviderI } from '../../types/provider.interface';

const ProviderService = {
  async getProviders() {
    return getApiData(
      providersURI,
      '',
    );
  },
  async getSpecificProvider(id: string | undefined) {
    return getApiData(
      `${providersURI}/${id}`,
      '',
    );
  },
  async createProvider(body: ProviderI) {
    return postApiData(
      `${providersURI}/`,
      body,
      '',
    );
  },
  async updateProvider(id: string, body: ProviderI) {
    return putApiData(
      `${providersURI}/${id}`,
      body,
      '',
    );
  },
  async deleteProvider(id: string) {
    return deleteApiData(
      `${providersURI}/${id}`,
      '',
    );
  },
};

export default ProviderService;
