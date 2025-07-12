export interface Store {
  id: string;
  status: string;
  brand_name: string;
  address?: string;
  description: string;
  slug: string;
  img_url?: string;
  logo?: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  isDeleted?: boolean;
}

export interface StorePayload extends Store {
  state?: string;
  street?: string;
  city?: string;
  phone_number?: string;
  store_role?: string;
}
