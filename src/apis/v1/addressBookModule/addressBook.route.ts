import authenticate from '@src/apis/middleware/authenticate.middleware';
import {
  createAddressBookSchema,
  deleteAddressBookSchema,
  updateAddressBookSchema,
  updateAddressBookStatusSchema
} from '@src/apis/schemas/addressBook.schema';
import { Router } from 'express';
import AddressBookController from './addressBook.controller';

const addressBookRouter = Router();

addressBookRouter.post('/create', authenticate(), createAddressBookSchema, AddressBookController.addAddress());
addressBookRouter.get('/', authenticate(), AddressBookController.fetchAddresses());
addressBookRouter.post('/update', authenticate(), updateAddressBookSchema, AddressBookController.updateAddressDetails());
addressBookRouter.post('/set_default', authenticate(), updateAddressBookStatusSchema, AddressBookController.setDefaultAddress());
addressBookRouter.delete('/delete', authenticate(), deleteAddressBookSchema, AddressBookController.deleteOrDeactivateAddress());

export default addressBookRouter;
