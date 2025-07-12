import { BadRequestError } from '@src/common/errors';
import { PayoutAccount } from '@src/interfaces/payment';
import {
  createPayoutAccountRepo,
  deletePayoutAccountRepo,
  fetchPayoutAccountsRepo,
  findPayoutAccountRepo,
  updatePayoutAccountRepo
} from '../../repositories/payment.repository';

export const createPayoutAccountSrv = async (paymentAccountDetails: Partial<PayoutAccount>): Promise<PayoutAccount> => {
  const paymentAccount = await createPayoutAccountRepo({
    ...paymentAccountDetails
  });
  return paymentAccount;
};

export const fetchPayoutAccountsSrv = async (data: Partial<PayoutAccount>): Promise<PayoutAccount[] | PayoutAccount> => {
  const paymentAccount = await fetchPayoutAccountsRepo(data);
  if (data.reference) {
    const payoutAccount = paymentAccount[0];
    if (!payoutAccount) {
      throw new BadRequestError('Payout account not found');
    }
    return payoutAccount;
  }

  return paymentAccount;
};

export const updatePayoutAccountSrv = async (filter: Partial<PayoutAccount>, data: Partial<PayoutAccount>): Promise<PayoutAccount> => {
  console.log(filter);
  const paymentAccount = await findPayoutAccountRepo({ id: filter.id });
  if (!paymentAccount) {
    throw new BadRequestError('Record not found');
  }

  const updatedPaymentAccount = await updatePayoutAccountRepo({ id: filter.id }, data);
  return updatedPaymentAccount;
};

export const deletePayoutAccountSrv = async (filter: Partial<PayoutAccount>) => {
  const paymentAccount = await findPayoutAccountRepo({ id: filter.id });
  if (!paymentAccount) {
    throw new BadRequestError('Record not found');
  }
  const deletedPaymentAccount = await deletePayoutAccountRepo({ id: filter.id });
  return deletedPaymentAccount;
};
