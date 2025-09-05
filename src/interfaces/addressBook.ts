export interface AddressBook {
  id: string;
  first_name: string;
  last_name: string;
  type: string;
  reference: string;
  user_id: string;
  email?: string;
  address:string;
  state: string;
  city: string;
  street: string;
  phone_number: string;
  alternative_phone_number?: string;
  additional_information?: string;
  default?: boolean;
  created_at: Date;
  updated_at: Date;
}
