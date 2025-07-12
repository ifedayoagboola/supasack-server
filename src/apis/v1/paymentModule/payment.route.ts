import authenticate from '@src/apis/middleware/authenticate.middleware';
import { createPayoutAccountSchema, fetchPayoutAccountSchema, updatePayoutAccountSchema } from '@src/apis/schemas/payment.schema';
import { STATUS } from '@src/constants/store.constant';
import { IStatus } from '@src/interfaces/generals';
import { Router } from 'express';
import PaymentController from './payment.controller';

const paymentRouter = Router();

paymentRouter.post('/payout_account/create', authenticate(), createPayoutAccountSchema, PaymentController.createPayoutAccount());
paymentRouter.get('/payout_account', authenticate(), fetchPayoutAccountSchema, PaymentController.fetchStorePayoutAccounts());
paymentRouter.post('/payout_account/update', authenticate(), updatePayoutAccountSchema, PaymentController.updatePayoutAccountDetails());
paymentRouter.post('/payout_account/delete', authenticate(), updatePayoutAccountSchema, PaymentController.deletePayoutAccount());
paymentRouter.delete('/payout_account/activate', authenticate(), PaymentController.activateOrDeactivatePayoutAccount(STATUS['ACTIVE'] as IStatus));
paymentRouter.delete(
  '/payout_account/deactivate',
  authenticate(),
  PaymentController.activateOrDeactivatePayoutAccount(STATUS['INACTIVE'] as IStatus)
);
export default paymentRouter;
