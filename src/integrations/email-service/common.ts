import { AxiosRequestConfig, AxiosResponse } from 'axios';

import variables from '@src/variables';
import { httpClient } from '@src/utilities';
import { IError } from '@src/interfaces/client';
import { logger } from '@src/utilities';

export default class EmailService {
  private client = new httpClient({
    baseUrl: variables.services.email.baseUrl
  });

  protected throwError = (error: IError) => {
    if (error?.response?.data?.message) {
      throw error?.response?.data?.message;
    } else throw error.message;
  };
  public async makeRequest(requestData: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    try {
      logger.info(`[EMAIL DEBUG] Making request to: ${variables.services.email.baseUrl}${requestData.url}`);
      logger.info(`[EMAIL DEBUG] Request method: ${requestData.method}`);
      logger.info(`[EMAIL DEBUG] Request headers:`, requestData.headers);
      
      requestData.headers = requestData.headers || {};
      requestData.headers.Authorization = `${variables.integrations.sendbox.token}`;

      const response = await this.client.instance({
        method: requestData.method,
        url: requestData.url,
        ...(requestData.data && { data: requestData.data }),
        headers: requestData.headers
      });

      logger.info(`[EMAIL DEBUG] Response received:`, response.status, response.statusText);
      return response;
    } catch (error) {
      logger.error(`[EMAIL DEBUG] HTTP request failed:`, error);
      throw error;
    }
  }
}
