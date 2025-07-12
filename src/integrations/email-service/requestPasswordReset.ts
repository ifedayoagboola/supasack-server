import { PasswordResetRequestPayload } from '@src/interfaces/emailService';
import { logger } from '@src/utilities';
import EmailService from './common';

export default class RequestPasswordReset extends EmailService {
  protected EmailService: EmailService;

  public requestPasswordReset: any = async (data: PasswordResetRequestPayload) => {
    try {
      const response = await this.makeRequest({
        url: `/email/template`,
        method: 'POST',
        data: data
      });
      logger.info(`[REQUEST PASSWORD RESET SUCCESS] => ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      logger.error(`[REQUEST PASSWORD RESET ERROR] => ${error.message}`);
    }
  };
}
