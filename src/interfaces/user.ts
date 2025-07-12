export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  active: boolean;
  mobile: string;
  is_mobile_verified: boolean;
  sex: string;
  dob: string;
  profile_cover_img: string;
  qr_code: string;
  img_url: string;
  oAuth_channel?: string;
  oAuth_token?: string;
  reset_password_token?: string;
  reset_password_expire?: string;
  token?: string;
  refresh_token?: string;
  isDeleted?: boolean;
  created_at: Date;
  updated_at: Date;
}
