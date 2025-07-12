import { AxiosRequestConfig, AxiosResponse } from 'axios';

import variables from '@src/variables';
import { httpClient } from '@src/utilities';
import { IError } from '@src/interfaces/client';

export default class ElasticSearchBase {
  private client = new httpClient({
    baseUrl: variables.services.elastic_search.baseurl
  });

  protected throwError = (error: IError) => {
    if (error?.response?.data?.message) {
      throw error?.response?.data?.message;
    } else throw error.message;
  };
  public async makeRequest(requestData: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    requestData.headers = requestData.headers || {};

    const response = await this.client.instance({
      method: requestData.method,
      url: requestData.url,
      ...(requestData.data && { data: requestData.data }),
      headers: requestData.headers
    });

    return response;
  }
}
