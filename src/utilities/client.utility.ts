import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { logger } from '@src/utilities';
import ServiceUnavailableError from '@src/common/errors/ServiceUnavailableError';
import { ClientProps } from '@src/interfaces/client';
import { StatusCodes } from 'http-status-codes';

export default class Client {
  public instance: AxiosInstance;

  public constructor({ baseUrl, timeout, ...rest }: ClientProps) {
    const { headers, ...remainingConfig } = rest;
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: timeout || 50000,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      ...remainingConfig
    });

    this.instance.interceptors.response.use(
      (response: AxiosResponse<any>): AxiosResponse<any> => {
        logger.info(`Response: ${response.config.method} ${(response.config.url, response.status)}`);
        return response;
      },
      (error: any): any => {
        // if (error.status === StatusCodes.UNAUTHORIZED) {

        // }

        if (!error.response) {
          logger.error('Response: Network Error');
        } else {
          logger.info(`Response: ${error.response.config.method} ${(error.response.config.url, error.response.status)}`);
          logger.error('Response Error', error.response.data);
        }

        if (error.code === 'ECONNABORTED') {
          logger.error('Response: ECONNABORTED, timed out.', error);
          throw new ServiceUnavailableError('Service currently unavailable.');
        }

        return Promise.reject(error);
      }
    );
  }
}
