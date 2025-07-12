import { logger } from '@src/utilities';
import ElasticSearchBase from './common';
import ElasticSearchService from './common';

export default class SearchRecord extends ElasticSearchBase {
  protected elasticSearchBase: ElasticSearchBase;

  public SearchRecord: any = async (data: any) => {
    console.log(data)
    try {
      const response = await this.makeRequest({
        url: `/products/product/_search`,
        method: 'GET',
        data: data
      });
      return response.data.hits.hits;
    } catch (error) {
      logger.error(`[ELASTIC SEARCH ==> Error retrieving product] => ${error.message}`);
    }
  };
}
