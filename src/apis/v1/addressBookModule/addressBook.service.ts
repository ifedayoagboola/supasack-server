import { BadRequestError } from '@src/common/errors';
import { AddressBook } from '@src/interfaces/addressBook';
import {
  createAddressRepo,
  deleteAddressRepo,
  fetchAddressesRepo,
  fetchAddressRepo,
  findAddressRepo,
  updateAddressRepo
} from '../../repositories/addressBook.repository';

export const addAddressSrv = async (addressDetails: AddressBook): Promise<AddressBook> => {
  const { user_id } = addressDetails;
  const existingDefaultAddress = await fetchAddressRepo({ user_id, default: true });
  if (!existingDefaultAddress) {
    addressDetails.default = true;
  }
  const address = await createAddressRepo(addressDetails);
  return address;
};

export const fetchAddressesSrv = async (data: Partial<AddressBook>): Promise<AddressBook[] | AddressBook> => {
  if (data.id || data.default) {
    return await fetchAddressRepo(data);
  }
  const address = await fetchAddressesRepo(data);
  return address;
};

export const updateAddressSrv = async (filter: Partial<AddressBook>, data: Partial<AddressBook>): Promise<AddressBook> => {
  const address = await fetchAddressRepo({ ...filter });
  if (!address) {
    throw new BadRequestError('Record not found');
  }

  const updatedAddress = await updateAddressRepo({ id: filter.id }, data);
  return updatedAddress;
};

export const setDefaultAddressSrv = async (filter: Partial<AddressBook>): Promise<AddressBook> => {
  const address = await fetchAddressRepo({ ...filter });
  if (!address) {
    throw new BadRequestError('Record not found');
  }
  const existingDefaultAddress = await fetchAddressRepo({ user_id: filter.user_id, default: true });
  if (existingDefaultAddress) {
    await updateAddressRepo({ id: existingDefaultAddress.id }, { default: false });
  }
  
  const updatedAddress = await updateAddressRepo({ id: filter.id }, { default: true });
  return updatedAddress;
};

export const deleteAddressSrv = async (filter: Partial<AddressBook>) => {
  const address = await findAddressRepo({ id: filter.id });
  if (!address) {
    throw new BadRequestError('Record not found');
  }
  const deletedAddress = await deleteAddressRepo({ id: filter.id });
  return deletedAddress;
};
