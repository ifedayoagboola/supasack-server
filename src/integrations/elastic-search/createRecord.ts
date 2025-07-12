import { logger } from '@src/utilities';
import ElasticSearchBase from './common';

export default class CreateRecord extends ElasticSearchBase {
  protected elasticSearchBase: ElasticSearchBase;

  public createRecord: any = async (data: any) => {
    try {
      const response = await this.makeRequest({
        url: `/products/product/${data.id}`,
        method: 'POST',
        data: data
      });
      logger.info(`[ELASTIC SEARCH ==> Product added successfully] => ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      logger.error(`[ELASTIC SEARCH ==> Error adding product] => ${error.message}`);
    }
  };
}
