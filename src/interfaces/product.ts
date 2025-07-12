import { Prisma } from '@prisma/client';

export interface Product {
  id: string;
  views: number;
  rating: number;
  name: string;
  description: string;
  category_id: string;
  slug: string;
  user_id: string;
  tags?: string;
  status: string;
  estimated_delivery_duration: number;
  store_id: string;
  created_at: Date;
  updated_at: Date;
  isDeleted?: boolean;
}

export interface ProductWithVariants extends Product {
  product_variants: ProductVariant[];
}

export interface Advert {
  id: string,
  store_link: string,
  product_name: string,
  store_name: string,
  amount: number
}

export interface ProductVariant {
  id: string;
  status: string;
  color: string;
  img_urls: string[];
  video_url?: string;
  product_id: string;
  store_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductVariantWithSpecs extends ProductVariant {
  product_variant_specs?: ProductVariantSpec[];
}

export type FetchProductVariant = Omit<ProductVariant, 'img_urls'>;

export interface ProductVariantSpec {
  id: string;
  size: string;
  quantity: number;
  amount: Prisma.Decimal;
  product_variant_id: string;
}
