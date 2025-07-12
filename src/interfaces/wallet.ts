export interface Wallet {
  id: string;
  escrow_balance: number;
  available_balance: number;
  ledger_balance: number;
  user_id: string;
  store_id: string;
  created_at: Date;
  updated_at: Date;
}
