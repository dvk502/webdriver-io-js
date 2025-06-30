import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import * as https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});
const baseUrl = process.env.BASE_URL!;

export default class ApiController {
  private defaultTimeout: number;

  constructor(defaultTimeout: number = 120000) {
    this.defaultTimeout = defaultTimeout;
  }

  private async request(config: AxiosRequestConfig, timeout?: number) {
    config.timeout = timeout || this.defaultTimeout;
    config.httpsAgent = httpsAgent;

    try {
      const response: AxiosResponse = await axios(config);
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<any>;
      const message = error.response?.data?.developerMessage ?? error.message ?? String(error);

      throw new Error(message);
    }
  }

  protected async get(url: string, headers?: any, queryParams?: any, timeout?: number) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${baseUrl}${url}`,
      headers,
      params: queryParams
    };

    return this.request(config, timeout);
  }

  //   async getWithoutRedirects(url: string, queryParams?: any, timeout?: number) {
  //     const config: AxiosRequestConfig = {
  //       method: 'GET',
  //       url: `${baseUrl}${url}`,
  //       params: queryParams,
  //       maxRedirects: 0,
  //       validateStatus: (status: number) => status >= 302
  //     };

  //     return this.request(config, 'headers', timeout);
  //   }

  protected async post(url: string, data?: any, headers?: any, timeout?: number) {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${baseUrl}${url}`,
      headers,
      data
    };
    // console.log(config);
    return this.request(config, timeout);
  }

  protected async put(url: string, data?: any, headers?: any, timeout?: number) {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${baseUrl}${url}`,
      headers,
      data
    };
  //  console.log('PUT Request config:', config);
    return this.request(config, timeout);
  }

  protected async delete(
    url: string,
    headers?: any,
    timeout?: number
  ) {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `${baseUrl}${url}`,
      headers
    };

    return this.request(config, timeout);
  }

  protected async patch(url: string, data?: any, headers?: any, timeout?: number) {
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: `${baseUrl}${url}`,
      headers,
      data
    };
    return this.request(config, timeout);
  }
}
