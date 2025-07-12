import { PrismaClient } from '@prisma/client';
import { Transactions } from '@src/interfaces/transactions';

const prisma = new PrismaClient();

export const createTransactionRepo = async (data: Transactions): Promise<Transactions> => {
  const transaction = await prisma.transactions.create({
    data: data
  });
  return transaction;
};

export const createBulkTransactionRepo = async (data: Partial<Transactions[]>): Promise<Transactions[] |any> => {
  const transactions = await prisma.transactions.createMany({data});
  return transactions;
};

export const findTransactionRepo = async (filters: { id: string }): Promise<Transactions | null> => {
  const transaction = await prisma.transactions.findUnique({
    where: filters
  });
  return transaction;
};

export const fetchTransactionRepo = async (filters: Partial<Transactions>): Promise<Transactions[]> => {
  const transactions = await prisma.transactions.findMany({
    where: { ...filters }
  });

  return transactions;
};

export const updateTransactionRepo = async (filters: { id: string }, data: Partial<Transactions>): Promise<Transactions> => {
  const updatedTransaction = await prisma.transactions.update({
    data: data,
    where: filters
  });
  return updatedTransaction;
};
