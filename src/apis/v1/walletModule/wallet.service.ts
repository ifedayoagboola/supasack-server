import { BadRequestError, ResourceNotFoundError } from '@src/common/errors';
import { Wallet } from '@src/interfaces/wallet';
import { createWalletRepo, decreaseAvailableBalanceRepo, findWalletRepo, increaseAvailableBalanceRepo } from '../../repositories/wallet.repository';

export const createWalletSrv = async (data: Partial<Wallet>): Promise<Wallet> => {
  const wallet = await findWalletRepo({ store_id: data.store_id });
  if (wallet) {
    throw new BadRequestError('A wallet already exists for this store');
  }
  const createdWallet = await createWalletRepo(data);
  return createdWallet;
};

export const getStoreWalletSrv = async (filter: Partial<Wallet>): Promise<Partial<Wallet>> => {
  const wallet = await findWalletRepo({ store_id: filter.store_id });
  if (!wallet) {
    throw new ResourceNotFoundError('Wallet not available for this store');
  }
  return wallet;
};

export const incrementAvailableBalanceSrv = async (filter: Partial<Wallet>, amount: number): Promise<Wallet> => {
  const wallet = await findWalletRepo({ store_id: filter.store_id });
  if (!wallet) {
    throw new ResourceNotFoundError('Wallet not available for this store');
  }

  const updatedAvailableBalance = await increaseAvailableBalanceRepo({ store_id: filter.store_id }, amount);
  return updatedAvailableBalance;
};

export const decrementAvailableBalanceSrv = async (filter: Partial<Wallet>, amount: number): Promise<Wallet> => {
  const wallet = await findWalletRepo({ store_id: filter.store_id });
  if (!wallet) {
    throw new ResourceNotFoundError('Wallet not available for this store');
  }

  const updatedAvailableBalance = await decreaseAvailableBalanceRepo({ store_id: filter.store_id }, amount);
  return updatedAvailableBalance;
};
