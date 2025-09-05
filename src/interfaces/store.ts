import { User } from "./user";

export interface Store {
  id: string;
  status: string;
  brand_name: string;
  address: string;
  email: string;
  postcode: string;
  description: string;
  phone_number: string;
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
  store_role?: string;
}

export interface AdminStorePayload  {
  merchantDetails: Partial<User>,
  storeDetails: Partial<StorePayload>
}
