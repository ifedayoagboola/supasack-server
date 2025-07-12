import { fetchTransactionRepo } from "@src/apis/repositories/transactions.repository";
import { Transactions } from "@src/interfaces/transactions";


export const fetchStoreTransactionsSrv = async (storeId: string): Promise<Transactions[]> => {
  const transactions = await fetchTransactionRepo({ store_id: storeId });
  return transactions;
};