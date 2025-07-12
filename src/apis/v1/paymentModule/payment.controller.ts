import { PAYOUT_ACCOUNT_TYPE } from '@src/constants/payout.constant';
import { STATUS } from '@src/constants/store.constant';
import { IStatus } from '@src/interfaces/generals';
import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createPayoutAccountSrv, deletePayoutAccountSrv, fetchPayoutAccountsSrv, updatePayoutAccountSrv } from './payment.service';

const PayoutAccountController = {
  createPayoutAccount: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const { account_name, bank_name, bank_account_number } = req.body;
      const { store_id } = req.query as Record<string, string>;
      const payoutAccount = await createPayoutAccountSrv({
        user_id: id,
        reference: store_id,
        type: PAYOUT_ACCOUNT_TYPE.STORE_ACCOUNT,
        status: STATUS.ACTIVE,
        account_name,
        bank_name,
        bank_account_number
      });
      respond(res, payoutAccount, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  fetchStorePayoutAccounts: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const { store_id } = req.query as Record<string, string>;
      const filters = {
        reference: store_id,
        user_id: id
      };
      const payoutAccounts = await fetchPayoutAccountsSrv(filters);
      return respond(res, payoutAccounts, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  updatePayoutAccountDetails: (): RequestHandler => async (req, res, next) => {
    try {
      const { payout_account_id } = req.query as Record<string, string>;
      const payoutAccountDetails = req.body;
      const updatedPayoutAccount = await updatePayoutAccountSrv({ id: payout_account_id }, payoutAccountDetails);

      return respond(res, updatedPayoutAccount, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  activateOrDeactivatePayoutAccount:
    (status: IStatus): RequestHandler =>
    async (req, res, next) => {
      try {
        const { payout_account_id } = req.query as Record<string, string>;
        const updatedPayoutAccount = await updatePayoutAccountSrv({ id: payout_account_id }, { status });

        return respond(res, updatedPayoutAccount, StatusCodes.OK);
      } catch (error) {
        next(error);
      }
    },

  deletePayoutAccount: (): RequestHandler => async (req, res, next) => {
    try {
      const payout_account_id = req.params.payout_account_id;
      const deletedPayoutAccount = await deletePayoutAccountSrv({ id: payout_account_id });
      return respond(res, deletedPayoutAccount, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default PayoutAccountController;
