import { PrismaClient } from '@prisma/client';
import { PayoutAccount } from '@src/interfaces/payment';

const prisma = new PrismaClient();

export const createPayoutAccountRepo = async (payoutAccountDetails: Partial<PayoutAccount>): Promise<PayoutAccount> => {
  const { account_name, bank_name, bank_account_number, reference, status, type, user_id } = payoutAccountDetails;
  const payoutAccount = await prisma.payoutAccount.create({
    data: {
      account_name,
      bank_name,
      bank_account_number,
      reference,
      status,
      type,
      user_id
    }
  });

  return payoutAccount;
};

export const fetchPayoutAccountsRepo = async (filter: Partial<PayoutAccount>): Promise<PayoutAccount[]> => {
  const payoutAccount = await prisma.payoutAccount.findMany({
    where: { ...filter }
  });
  return payoutAccount;
};

export const findPayoutAccountRepo = async (filter: { id: string }): Promise<PayoutAccount | null> => {
  const payoutAccount = await prisma.payoutAccount.findUnique({
    where: filter
  });
  return payoutAccount;
};

export const updatePayoutAccountRepo = async (filters: { id: string }, data: Partial<PayoutAccount>): Promise<PayoutAccount> => {
  const payoutAccount = await prisma.payoutAccount.update({
    data: {
      ...data
    },
    where: filters
  });
  return payoutAccount;
};

export const deletePayoutAccountRepo = async (filters: { id: string }): Promise<PayoutAccount> => {
  const payoutAccount = await prisma.payoutAccount.delete({
    where: filters
  });
  return payoutAccount;
};
