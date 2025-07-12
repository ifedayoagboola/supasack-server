export interface StoreRole {
  id: string;
  user_id: string;
  store_id: string;
  role_id: string;
  created_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}
