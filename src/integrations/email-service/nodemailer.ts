import nodemailer from 'nodemailer';
import { EmailPayload } from '@src/interfaces/emailService';
import { logger } from '@src/utilities';
import variables from '@src/variables';

export default class NodemailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create transporter based on environment configuration
    this.transporter = nodemailer.createTransport({
      host: variables.email.smtp.host,
      port: variables.email.smtp.port,
      secure: variables.email.smtp.secure, // true for 465, false for other ports
      auth: {
        user: variables.email.smtp.user,
        pass: variables.email.smtp.pass,
      },
    });
  }

  public async sendEmail(data: EmailPayload): Promise<any> {
    try {
      logger.info(`[NODEMAILER] Sending email to: ${data.to}`);
      logger.info(`[NODEMAILER] Subject: ${data.subject}`);

      const mailOptions = {
        from: variables.email.from || variables.email.smtp.user,
        to: data.to,
        subject: data.subject,
        html: data.body,
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      logger.info(`[NODEMAILER] Email sent successfully to ${data.to}`);
      logger.info(`[NODEMAILER] Message ID: ${result.messageId}`);
      
      return {
        success: true,
        messageId: result.messageId,
        response: result.response
      };
    } catch (error) {
      logger.error(`[NODEMAILER] Failed to send email to ${data.to}:`, error);
      throw error;
    }
  }

  public async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      logger.info('[NODEMAILER] Connection verified successfully');
      return true;
    } catch (error) {
      logger.error('[NODEMAILER] Connection verification failed:', error);
      return false;
    }
  }
} 