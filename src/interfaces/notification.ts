import { JsonValue } from "./generals";

export interface Notification {
  id?: string;
  user_id: string;
  message: string;
  reference: string;
  action: string;
  status?: string;
  isPublic?: boolean;
  isStore?: boolean;
  store_id?: string;
  type: string;
  meta?: JsonValue;
  created_at?: Date;
  updated_at?: Date;
}