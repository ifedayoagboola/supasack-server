import { EmailPayload, PasswordResetRequestPayload } from '@src/interfaces/emailService';
import { OrderEmailData } from '@src/interfaces/order';
import { logger } from '@src/utilities';
import EmailService from './common';
import variables from '@src/variables';

export default class EmailNotification extends EmailService {
  protected EmailService: EmailService;

  public emailNotification: any = async (data: EmailPayload) => {
    try {
      logger.info(`[EMAIL DEBUG] Starting email notification to: ${data.to}`);
      logger.info(`[EMAIL DEBUG] Email service base URL: ${variables.services.email.baseUrl}`);
      logger.info(`[EMAIL DEBUG] Sendbox token present: ${!!variables.integrations.sendbox.token}`);
      
      const requestData = {
        url: `/email/send`,
        method: 'POST' as const,
        data: {
          to: data.to,
          subject: data.subject,
          content: data.body
        }
      };
      
      logger.info(`[EMAIL DEBUG] Request data:`, JSON.stringify(requestData, null, 2));
      
      const response = await this.makeRequest(requestData);
      logger.info(`[Email sent successfully] => ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      logger.error(`[Email failed to send] => ${error.message}`);
      logger.error(`[EMAIL DEBUG] Full error:`, error);
      throw error; // Re-throw the error so Promise.all can catch it
    }
  };
}
