import { ADDRESS_BOOK_TYPE } from '@src/constants/addressbook.constant';
import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addAddressSrv, deleteAddressSrv, fetchAddressesSrv, setDefaultAddressSrv, updateAddressSrv } from './addressBook.service';

const AddressBookController = {
  addAddress: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      let addressBookPayload = {
        ...req.body,
        user_id: id,
        type: ADDRESS_BOOK_TYPE.CONTACT_ADDRESS
      };

      const addressBook = await addAddressSrv(addressBookPayload);
      respond(res, addressBook, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  fetchAddresses: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      let filters: any = {
        id: req.query?.address_book_id?.toString(),
        user_id: id
      };

      if (req.query.is_default) {
        filters.default = req.query?.is_default === 'true' ? true : false;
      }

      const userAddresses = await fetchAddressesSrv(filters);
      return respond(res, userAddresses, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  updateAddressDetails: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const { address_book_id } = req.query as Record<string, string>;
      const addressItemDetails = req.body;
      const updatedAddress = await updateAddressSrv({ id: address_book_id, user_id: id }, addressItemDetails);

      return respond(res, updatedAddress, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  setDefaultAddress: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const { address_book_id } = req.query as Record<string, string>;
      const updatedAddress = await setDefaultAddressSrv({ id: address_book_id, user_id: id });
      return respond(res, updatedAddress, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  deleteOrDeactivateAddress: (): RequestHandler => async (req, res, next) => {
    try {
      const { address_book_id } = req.query as Record<string, string>;
      await deleteAddressSrv({ id: address_book_id });
      return respond(res, 'Address deleted successfully', StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default AddressBookController;
