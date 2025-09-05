export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  active: boolean;
  is_email_verified: boolean;
  mobile: string;
  is_mobile_verified: boolean;
  sex: string;
  dob: string;
  address: string;
  profile_cover_img: string;
  qr_code?: string;
  img_url?: string;
  oAuth_channel?: string;
  oAuth_token?: string;
  reset_password_token?: string;
  reset_password_expire?: string;
  token?: string;
  refresh_token?: string;
  isDeleted?: boolean;
  created_at: Date;
  updated_at: Date;
  
  // User roles and permissions
  user_role_id?: string;
  user_role?: UserRole;
  permissions?: UserPermission[];
}

export interface UserRole {
  id: string;
  name: string;
  description?: string;
  level: number;
  created_at: Date;
  updated_at: Date;
  permissions?: UserPermission[];
}

export interface UserPermission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  created_at: Date;
  updated_at: Date;
}
