import { Prisma } from '@prisma/client';
import { JsonValue } from './generals';

export interface Transactions {
  id?: string;
  status: string;
  amount: Prisma.Decimal;
  store_id?: string;
  user_id?: string;
  type: string;
  description?: string;
  meta?: JsonValue;
  completed_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
