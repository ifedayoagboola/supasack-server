export interface StorePayload {
  brand_name: string;
  description: string;
  state: string;
  city: string;
  street: string;
  phone_number: string;
  user_id: string;
  status: boolean;
  slug: string;
  img_url?: string;
}

export interface Store {
  id: number;
  brand_name: string;
  description: string;
  user_id: number;
  status: boolean;
  slug: string;
  isDeleted: boolean;
  created_at: Date;
  updated_at: Date;
} 