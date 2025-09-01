import { createBulkRepo } from '@src/apis/repositories/auth.repository';
import { logger, respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  appleAuthUserSrv,
  authenticateUserSrv,
  createUserSrv,
  deleteUserAccountSrv,
  fetchUserDetailsSrv,
  googleAuthUserSrv,
  registerUserWithAppleSrv,
  registerUserWithGoogleSrv,
  requestPasswordResetSrv,
  resetPasswordSrv,
  updateUserDetailsSrv
} from './auth.service';

const AuthController = {
  register: (): RequestHandler => async (req, res, next) => {
    try {
      const user = await createUserSrv(req.body);
      respond(res, user, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  bulkRegister: (): RequestHandler => async (req, res, next) => {
    try {
      console.log(req.body);

      const user = await createBulkRepo(req.body);
      respond(res, user, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  authenticateUser: (): RequestHandler => async (req, res, next) => {
    try {
      console.log(req.body, 'error');
      const { email, password } = req.body;

      const authenticatedUser = await authenticateUserSrv({ email, password });
      respond(res, authenticatedUser, StatusCodes.OK);
    } catch (error) {
      console.log(error, 'here');
      next(error);
    }
  },
  requestPasswordReset: (): RequestHandler => async (req, res, next) => {
    try {
      const { email, redirect_url } = req.body;
      const passwordResetRequest = await requestPasswordResetSrv({ email, redirectUrl: redirect_url });
      logger.info(`[REQUEST PASSWORD RESET] ${JSON.stringify(passwordResetRequest)}`);

      respond(res, 'Your password reset request was successful, kindly check your email to proceed. Thank you ', StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  resetPassword: (): RequestHandler => async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const resetPassword = await resetPasswordSrv({ token, password });
      logger.info(`[PASSWORD RESET SUCCESSFUL] ${resetPassword}`);
      respond(res, 'Password reset was successful.', StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  googleAuthUser: (): RequestHandler => async (req, res, next) => {
    try {
      const { token } = req.body as Record<string, string>;

      const authenticatedUser = await googleAuthUserSrv(token);

      respond(res, authenticatedUser, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  registerUserWithGoogleAuth: (): RequestHandler => async (req, res, next) => {
    try {
      const { token } = req.body as Record<string, string>;

      const authenticatedUser = await registerUserWithGoogleSrv(token);

      respond(res, authenticatedUser, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  appleAuthUser: (): RequestHandler => async (req, res, next) => {
    try {
      const { identity_token, user } = req.body as Record<string, string>;

      const authenticatedUser = await appleAuthUserSrv(identity_token, user);

      respond(res, authenticatedUser, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  registerUserWithAppleAuth: (): RequestHandler => async (req, res, next) => {
    try {
      const { identity_token, user, family_name, given_name } = req.body;
      const data = {
        identity_token,
        user,
        family_name,
        given_name
      };

      const authenticatedUser = await registerUserWithAppleSrv(data);

      respond(res, authenticatedUser, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  getUserDetails: (): RequestHandler => async (req, res, next) => {
    const { id, email, active, first_name, last_name, mobile, user_role } = res.locals.user;

    const userDetails = await fetchUserDetailsSrv({ id });
    return respond(res, userDetails, StatusCodes.OK);
  },

  getMyDetails: (): RequestHandler => async (req, res, next) => {
    const { id, email, active, first_name, last_name, mobile, user_role } = res.locals.user;

    const userDetails = {
      id,
      email,
      active,
      first_name,
      last_name,
      mobile,
      role: user_role.name
    };
    return respond(res, userDetails, StatusCodes.OK);
  },

  updateUserDetails: (): RequestHandler => async (req, res, next) => {
    const { id } = res.locals.user;
    const profileDetails = req.body;

    const updatedUserDetails = await updateUserDetailsSrv({ id }, profileDetails);
    return respond(res, updatedUserDetails, StatusCodes.OK);
  },

  deleteUserAccount: (): RequestHandler => async (req, res, next) => {
    const { id } = res.locals.user;

    const profileDetails = req.body;

    await deleteUserAccountSrv({ id }, { isDeleted: true });
    return respond(res, 'User deleted successfully', StatusCodes.OK);
  }
};

export default AuthController;
