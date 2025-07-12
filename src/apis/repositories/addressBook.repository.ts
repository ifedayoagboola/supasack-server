import { PrismaClient } from '@prisma/client';
import { AddressBook } from '@src/interfaces/addressBook';

const prisma = new PrismaClient();

export const createAddressRepo = async (addressBookDetails: AddressBook): Promise<AddressBook> => {
  const addressBook = await prisma.addressBook.create({
    data: addressBookDetails
  });

  return addressBook;
};

export const fetchAddressesRepo = async (filter: Partial<AddressBook | any>): Promise<AddressBook[]> => {
  const addressBook = await prisma.addressBook.findMany({
    where: { ...filter }
  });
  return addressBook;
};

export const findAddressRepo = async (filter: { id: string }): Promise<AddressBook | null> => {
  const addressBook = await prisma.addressBook.findUnique({
    where: filter
  });
  return addressBook;
};

export const fetchAddressRepo = async (filter: Partial<AddressBook>): Promise<AddressBook | null> => {
  const addressBook = await prisma.addressBook.findFirst({
    where: { ...filter }
  });
  return addressBook;
};

export const updateAddressRepo = async (filters: { id: string }, data: Partial<AddressBook>): Promise<AddressBook> => {
  const addressBook = await prisma.addressBook.update({
    data: {
      ...data
    },
    where: filters
  });
  return addressBook;
};

export const deleteAddressRepo = async (filters: { id: string }): Promise<AddressBook> => {
  const addressBook = await prisma.addressBook.delete({
    where: filters
  });
  return addressBook;
};
