import authenticate from '@src/apis/middleware/authenticate.middleware';
import {
  authAppleSchema,
  loginSchema,
  registerAppleSchema,
  registerUserSchema,
  requestPasswordResetSchema,
  resetPasswordResetSchema,
  updateUserSchema
} from '@src/apis/schemas/auth.schema';
import { Router } from 'express';
import AuthController from './auth.controller';

const authRouter = Router();


authRouter.post('/', registerUserSchema, AuthController.register());
authRouter.post('/bulk', AuthController.bulkRegister());
authRouter.post('/oAuth/google/register', AuthController.registerUserWithGoogleAuth())
authRouter.post('/oAuth/apple/register', registerAppleSchema, AuthController.registerUserWithAppleAuth());
authRouter.post('/updateProfile', authenticate(), updateUserSchema, AuthController.updateUserDetails());
authRouter.get('/', authenticate(), AuthController.getUserDetails());
authRouter.post('/oAuth/google', AuthController.googleAuthUser());
authRouter.post('/oAuth/apple', authAppleSchema, AuthController.appleAuthUser());
authRouter.post(`/request_password_reset`, requestPasswordResetSchema, AuthController.requestPasswordReset());
authRouter.post(`/reset_password`, resetPasswordResetSchema, AuthController.resetPassword());
authRouter.post('/login', loginSchema, AuthController.authenticateUser());
authRouter.delete('/account/delete', authenticate(), AuthController.deleteUserAccount());
export default authRouter;
