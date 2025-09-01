import EmailService from '@src/integrations/email-service';
import { store_creation_template } from '@src/integrations/email-service/store_creation_template';
import { admin_store_creation_template } from '@src/integrations/email-service/admin_store_creation_template';
import { Store, User } from '@src/interfaces';
import { IStatus } from '@src/interfaces/generals';
import { logger, respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import variables from '@src/variables';
import {
  activateOrDeactivateStoreSrv,
  createStoreServAdmin,
  createStoreSpecialSrv,
  createStoreSrv,
  deleteStoreSrv,
  fetchActiveStoresSrv,
  fetchStoresSrv,
  findStoreSrv,
  findStoreWithWalletSrv,
  updateStoreSrv
} from './store.service';
import { deleteUserAccountSrv } from '../authModule/auth.service';

const emailService = new EmailService();

const StoreController = {
  create: (): RequestHandler => async (req, res, next) => {
    try {
      const { id, email, first_name, user_role } = res.locals.user;
      let storePayload = req.body;
      let store;
      if (user_role.level === 100) {
        store = await createStoreServAdmin(storePayload);
      } else {
        storePayload = {
          ...storePayload,
          user_id: id
        };
        store = await createStoreSrv(storePayload);
      }

      // Debug: Check email service configuration
      logger.info(`[EMAIL DEBUG] Email service base URL: ${variables.services.email.baseUrl}`);
      logger.info(`[EMAIL DEBUG] Sendbox token: ${variables.integrations.sendbox.token ? 'Present' : 'Missing'}`);

      // Check if Nodemailer is properly configured
      const isNodemailerConfigured = variables.email.smtp.host && variables.email.smtp.user && variables.email.smtp.pass;

      if (isNodemailerConfigured) {
        logger.info(`[EMAIL] Nodemailer configured, sending notifications...`);

        // Send email to admin
        const adminEmailData = {
          to: `bitshubitsolutions@gmail.com`,
          subject: `Bitshub - New Store Application: ${storePayload.brand_name}`,
          body: admin_store_creation_template({
            first_name: first_name,
            store_name: storePayload.brand_name,
            user_email: email,
            store_description: storePayload.description,
            phone_number: storePayload.phone_number,
            state: storePayload.state,
            city: storePayload.city,
            street: storePayload.street
          })
        };

        // Send email to user
        const userEmailData = {
          to: email,
          subject: `Welcome to Supasac`,
          body: store_creation_template({
            first_name: first_name,
            store_name: storePayload.brand_name,
            user_email: email,
            store_description: storePayload.description
          })
        };

        logger.info(`[EMAIL DEBUG] Attempting to send emails to admin and user: ${email}`);

        // Send emails using Nodemailer (don't wait for them to complete)
        Promise.all([emailService.Nodemailer.sendEmail(adminEmailData), emailService.Nodemailer.sendEmail(userEmailData)])
          .then((results) => {
            logger.info(`[EMAIL DEBUG] Email sending completed successfully:`, results);
          })
          .catch((error) => {
            logger.error('[EMAIL DEBUG] Failed to send store creation emails:', error);
            logger.error('[EMAIL DEBUG] Error details:', {
              message: error.message,
              stack: error.stack
            });
          });
      } else {
        logger.warn(`[EMAIL DISABLED] Nodemailer not properly configured. Missing:`, {
          host: !variables.email.smtp.host,
          user: !variables.email.smtp.user,
          pass: !variables.email.smtp.pass
        });
        logger.info(`[EMAIL DISABLED] Would send admin email to: bitshubitsolutions@gmail.com`);
        logger.info(`[EMAIL DISABLED] Would send user email to: ${email}`);
        logger.info(`[EMAIL DISABLED] Store created: ${storePayload.brand_name}`);
      }

      respond(res, store, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  createSpecial: (): RequestHandler => async (req, res, next) => {
    try {
      let storePayload = req.body;

      const store = await createStoreSpecialSrv(storePayload);
      respond(res, store, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  getAllSellerStores: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;

      logger.info(`Uer Store id ${id}`);

      const filters = req.query;
      const userStores = await fetchStoresSrv({ user_id: id, ...filters });
      return respond(res, userStores, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  getStoreBySlug: (): RequestHandler => async (req, res, next) => {
    try {
      const { slug } = req.query as Record<string, string>;
      const store = await findStoreSrv({ slug });
      return respond(res, store, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  getStoreById: (): RequestHandler => async (req, res, next) => {
    try {
      const { storeId } = req.params;
      const store = await findStoreSrv({ id: storeId });
      // const store = await findStoreWithWalletSrv({ id: store_id });
      return respond(res, store, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  updateStoreDetails: (): RequestHandler => async (req, res, next) => {
    try {
      const { store_id } = req.query as Record<string, string>;
      const storeDetails = req.body;
      const updatedStore = await updateStoreSrv({ id: store_id }, storeDetails);
      return respond(res, updatedStore, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  updateAdminStoreDetails: (): RequestHandler => async (req, res, next) => {
    try {
      const storeId = req.params.storeId;
      const storeDetails = req.body;

      const updatedStore = await updateStoreSrv({ id: storeId }, storeDetails);

      return respond(res, updatedStore, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  activateOrDeactivateStore:
    (status: IStatus): RequestHandler =>
    async (req, res, next) => {
      try {
        const { store_id } = req.query as Record<string, string>;
        const store = await activateOrDeactivateStoreSrv({ id: store_id }, status);
        return respond(res, store, StatusCodes.OK);
      } catch (error) {
        next(error);
      }
    },

  deleteStore: (): RequestHandler => async (req, res, next) => {
    try {
      const storeId = req.params.storeId;
      const deletedStore = await deleteStoreSrv({ id: storeId });
      await deleteUserAccountSrv({ id: deletedStore.user_id }, { isDeleted: true });
      return respond(res, deletedStore, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  fetchStores: (): RequestHandler => async (req, res, next) => {
    try {
      const filters = req.query;
      const allStores = await fetchActiveStoresSrv(filters);
      return respond(res, allStores, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  testEmailConfig: (): RequestHandler => async (req, res, next) => {
    try {
      const config = {
        nodemailerConfigured: !!(variables.email.smtp.host && variables.email.smtp.user && variables.email.smtp.pass),
        smtpHost: variables.email.smtp.host,
        smtpPort: variables.email.smtp.port,
        smtpSecure: variables.email.smtp.secure,
        smtpUserPresent: !!variables.email.smtp.user,
        smtpPassPresent: !!variables.email.smtp.pass,
        fromEmail: variables.email.from,
        // Legacy Sendbox config (for reference)
        sendboxTokenPresent: !!variables.integrations.sendbox.token,
        sendboxSecretKeyPresent: !!variables.integrations.sendbox.secretKey,
        sendboxAppIdPresent: !!variables.integrations.sendbox.appId
      };

      logger.info('[EMAIL TEST] Configuration check:', config);
      return respond(res, config, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  testSmtpConnection: (): RequestHandler => async (req, res, next) => {
    try {
      const isConfigured = !!(variables.email.smtp.host && variables.email.smtp.user && variables.email.smtp.pass);

      if (!isConfigured) {
        return respond(
          res,
          {
            success: false,
            message: 'SMTP not configured. Please set environment variables first.',
            missing: {
              host: !variables.email.smtp.host,
              user: !variables.email.smtp.user,
              pass: !variables.email.smtp.pass
            }
          },
          StatusCodes.BAD_REQUEST
        );
      }

      // Test SMTP connection
      const connectionResult = await emailService.Nodemailer.verifyConnection();

      if (connectionResult) {
        return respond(
          res,
          {
            success: true,
            message: 'SMTP connection successful!',
            config: {
              host: variables.email.smtp.host,
              port: variables.email.smtp.port,
              secure: variables.email.smtp.secure,
              user: variables.email.smtp.user
            }
          },
          StatusCodes.OK
        );
      } else {
        return respond(
          res,
          {
            success: false,
            message: 'SMTP connection failed. Check your credentials and network.',
            config: {
              host: variables.email.smtp.host,
              port: variables.email.smtp.port,
              secure: variables.email.smtp.secure
            }
          },
          StatusCodes.BAD_REQUEST
        );
      }
    } catch (error) {
      logger.error('[SMTP TEST] Connection test failed:', error);
      return respond(
        res,
        {
          success: false,
          message: 'SMTP connection test failed',
          error: error.message
        },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  testEmailSending: (): RequestHandler => async (req, res, next) => {
    try {
      const isConfigured = !!(variables.email.smtp.host && variables.email.smtp.user && variables.email.smtp.pass);

      if (!isConfigured) {
        return respond(
          res,
          {
            success: false,
            message: 'SMTP not configured. Please set environment variables first.',
            missing: {
              host: !variables.email.smtp.host,
              user: !variables.email.smtp.user,
              pass: !variables.email.smtp.pass
            }
          },
          StatusCodes.BAD_REQUEST
        );
      }

      // Send a test email
      const testEmailData = {
        to: variables.email.smtp.user, // Send to yourself as a test
        subject: 'Nodemailer Test - Bitshub Email System',
        body: `
          <html>
            <body>
              <h2>🎉 Nodemailer Test Successful!</h2>
              <p>This is a test email from your Bitshub email system.</p>
              <p><strong>Configuration:</strong></p>
              <ul>
                <li>Host: ${variables.email.smtp.host}</li>
                <li>Port: ${variables.email.smtp.port}</li>
                <li>Secure: ${variables.email.smtp.secure}</li>
                <li>From: ${variables.email.from}</li>
              </ul>
              <p>If you receive this email, your Nodemailer setup is working correctly!</p>
              <p>Timestamp: ${new Date().toISOString()}</p>
            </body>
          </html>
        `
      };

      const result = await emailService.Nodemailer.sendEmail(testEmailData);

      return respond(
        res,
        {
          success: true,
          message: 'Test email sent successfully!',
          result: result,
          config: {
            host: variables.email.smtp.host,
            port: variables.email.smtp.port,
            secure: variables.email.smtp.secure,
            from: variables.email.from,
            to: testEmailData.to
          }
        },
        StatusCodes.OK
      );
    } catch (error) {
      logger.error('[EMAIL TEST] Test email failed:', error);
      return respond(
        res,
        {
          success: false,
          message: 'Test email failed',
          error: error.message,
          config: {
            host: variables.email.smtp.host,
            port: variables.email.smtp.port,
            secure: variables.email.smtp.secure
          }
        },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
};

export default StoreController;
