import { PrismaClient } from '@prisma/client';
import { Wallet } from '@src/interfaces/wallet';

const prisma = new PrismaClient();

export const createWalletRepo = async (data: Partial<Wallet>): Promise<Wallet> => {
  const createdWallet = await prisma.wallet.create({
    data: {
      user_id: data.user_id,
      store_id: data.store_id
    }
  });

  return createdWallet;
};

export const findWalletRepo = async (filter: { id: string } | { store_id: string }): Promise<Partial<Wallet> | null> => {
  const foundWallet = await prisma.wallet.findUnique({
    where: filter,
    select: {
      escrow_balance: true,
      available_balance: true
    }
  });

  return foundWallet;
};

export const fetchWalletRepo = async (filter: Partial<Wallet>): Promise<Partial<Wallet> | null> => {
  const foundWallet = await prisma.wallet.findFirst({
    where: { ...filter },
    select: {
      escrow_balance: true,
      available_balance: true
    }
  });

  return foundWallet;
};

export const increaseAvailableBalanceRepo = async (filters: { id: string } | { store_id: string }, amount: number): Promise<Wallet> => {
  const updatedAvailableBalance = await prisma.wallet.update({
    data: {
      available_balance: { increment: amount }
    },
    where: filters
  });
  return updatedAvailableBalance;
};

export const creditAvailableBalanceRepo = async (filters: { id: string } | { store_id: string }, amount: number): Promise<Wallet> => {
 
    const updatedAvailableBalance = await prisma.wallet.update({
      data: {
        escrow_balance: { decrement: amount },
        available_balance: {increment: amount }
      },
      where: filters
    })
  
  return updatedAvailableBalance;
};

export const decreaseAvailableBalanceRepo = async (filters: { id: string } | { store_id: string }, amount: number): Promise<Wallet> => {
  const updatedAvailableBalance = await prisma.wallet.update({
    data: {
      available_balance: { decrement: amount }
    },
    where: filters
  });
  return updatedAvailableBalance;
};

export const increaseEscrowBalanceRepo = async (filters: { id: string } | { store_id: string }, amount: number): Promise<Wallet> => {
  const updatedEscrowBalance = await prisma.wallet.update({
    data: {
      escrow_balance: { increment: amount }
    },
    where: filters
  });
  return updatedEscrowBalance;
};

export const decreaseEscrowBalanceRepo = async (filters: { id: string } | { store_id: string }, amount: number): Promise<Wallet> => {
  const updatedEscrowBalance = await prisma.wallet.update({
    data: {
      escrow_balance: { decrement: amount }
    },
    where: filters
  });
  return updatedEscrowBalance;
};