import { Prisma } from '@prisma/client';
import { JsonValue } from './generals';

export interface Cart {
  id: string;
  user_id: string;
  product_id: string;
  product_variant_id: string;
  product_variant_spec_id: string;
  store_id: string;
  size: string;
  amount: Prisma.Decimal;
  color: string;
  variant_img_url: string;
  quantity: number;
  meta?: JsonValue;
  created_at: Date;
  updated_at: Date;
}
