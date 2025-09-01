import { Category } from "./category";



export interface Subcategory {
  id: string;
  name: string;
  img_url?: string;
  category_id? : string;
  category_name?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;

  category?: Partial<Category>
}