import { AxiosInstance, AxiosRequestConfig } from 'axios';

export class PerformRequestHelper {
  static async performRequest<TResponse>(
    config: AxiosRequestConfig,
    axios: AxiosInstance,
  ): Promise<TResponse> {
    try {
      console.log('[client-request] Request config:', config);

      const { data } = await axios.request({
        ...config,
        params: {
          ...axios.defaults.params,
          ...config.params,
        },
      } as AxiosRequestConfig);

      console.log('[client-request] Data:', data);

      return data;
    } catch (err) {
      console.log(
        `[client-request] Request: ${err.config.method.toUpperCase()} ${
          err.config.baseURL
        }${err.config.url}`,
        err,
      );
      throw err;
    }
  }
}
