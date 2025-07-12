import { Prisma } from '@prisma/client';
import { JsonValue } from './generals';

export interface Order {
  id?: number;
  user_id: string;
  product_id: string;
  product_variant_id: string;
  product_variant_spec_id: string;
  store_id: string;
  status: string;
  size: string;
  amount: Prisma.Decimal;
  color: string;
  variant_img_url: string;
  order_reference: string;
  quantity: number;
  meta?: JsonValue;
  created_at?: Date;
  updated_at?: Date;
}

export interface OrderEmailData {
  product_name: string;
  quantity: number;
  price: number;
  img_url: string;
  profile_name: string;
  order_status: string;
}