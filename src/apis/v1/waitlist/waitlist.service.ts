import { fetchTransactionRepo } from "@src/apis/repositories/transactions.repository";
import { addToWaitlistRepo } from "@src/apis/repositories/waitlist.repository";
import { Transactions } from "@src/interfaces/transactions";
import { Waitlist } from "@src/interfaces/waitlist";


export const waitlistRegistrationSrv = async (payload:Waitlist): Promise<Waitlist> => {
  const addToWaitList = await addToWaitlistRepo(payload);
  return addToWaitList;
};