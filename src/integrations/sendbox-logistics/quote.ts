import { logger } from '@src/utilities';
import SendboxBase from './common';

let payload: any = {
  origin_name: 'Mrs. Hippo',
  origin_phone: '+2348170441446',
  origin_street: 'Clayton St.',
  origin_city: 'Ikorodu',
  origin_country: 'NIGERIA',
  origin_country_code: 'NG',
  origin_state: 'Lagos',
  destination_name: 'Brian',
  destination_phone: '+2348170441446',
  destination_country: 'NIGERIA',
  destination_country_code: 'NG',
  weight: '1',
  items: [
    {
      name: 'Test Brian Iyoha',
      quantity: '1',
      weight: '1',
      amount: '100',
      value: '120000'
    }
  ]
};
export default class Quote extends SendboxBase {
  protected sendboxBase: SendboxBase;

  public getQuote: any = async (data: any) => {
    try {
      return {
        delivery_Fee: 1200
      }
      // const { location, product_id } = data;
      // payload = {
      //   ...payload,
      //   destination_city: location.city,
      //   destination_state: location.state,
      //   destination_street: location.street
      // };
      // const response = await this.makeRequest({
      //   url: `/shipping/shipment_delivery_quote`,
      //   method: 'POST',
      //   data: payload
      // });

      // logger.info(`[GET QUOTE SUCCESS => ${JSON.stringify(response.data)}]`);
      // return response.data;
    } catch (error) {
      error?.reponse?.data
        ? logger.error(`[GET QUOTE ERROR] => ${JSON.stringify(error?.reponse?.data)}`)
        : logger.error(`[GET QUOTE ERROR] => ${error.message}`);
      this.throwError(error);
    }
  };
}
