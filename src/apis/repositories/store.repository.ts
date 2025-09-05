import { AddressBook, PrismaClient } from '@prisma/client';
import { UnprocessableEntityError } from '@src/common/errors';
import { Store, StorePayload } from '../../interfaces/store';
import { IStatus } from '@src/interfaces/generals';
import { ADDRESS_BOOK_TYPE } from '@src/constants/addressbook.constant';
import { STORE_ROLES } from '@src/constants/roles.contant';
import { globalFilter } from '@src/constants';

const prisma = new PrismaClient();

export const createStoreRepo = async (storeDetails: Partial<StorePayload>) => {
  const { brand_name, description, phone_number, email, address, postcode } = storeDetails;
  console.log(storeDetails, 'stroeDetails234');

  return await prisma.$transaction(async (trx) => {
    // Create store
    const store = await trx.store.create({
      data: {
        brand_name,
        description: description ?? '',
        address,
        phone_number,
        email,
        postcode,
        user_id: storeDetails.user_id,
        status: storeDetails.status,
        slug: storeDetails.slug || brand_name.toLowerCase().replace(/\s+/g, '-')
      }
    });

    console.log(store, 'stroeDetails');
    // Create address
    const addressBook = await trx.addressBook.create({
      data: {
        first_name: store.brand_name,
        last_name: store.brand_name,
        user_id: store.user_id,
        address: store.address,
        state: storeDetails?.state || '',
        city: storeDetails?.city || '',
        street: storeDetails?.street || '',
        phone_number,
        reference: store.id,
        type: ADDRESS_BOOK_TYPE.STORE_ADDRESS
      }
    });

    // Create wallet
    await trx.wallet.create({
      data: {
        user_id: store.user_id,
        store_id: store.id
      }
    });

    // Assign store owner role
    const role = await trx.role.findUnique({ where: { role: STORE_ROLES.OWNER } });
    if (!role) {
      throw new UnprocessableEntityError('User role must be set to owner');
    }
    await trx.storeRole.create({
      data: {
        user_id: store.user_id,
        store_id: store.id,
        role_id: role.id
      }
    });

    return {
      ...store,
      address: addressBook.address,
      phone_number: addressBook.phone_number,
      store_role: role.role
    };
  });
};

export const createStoreSpecialRepo = async (storeDetails: StorePayload) => {
  const { id, brand_name, description, user_id, status, slug, address, email, postcode, state, city, street, img_url, phone_number } = storeDetails;
  return await prisma.$transaction(async (trx) => {
    const store = await trx.store.create({
      data: {
        id,
        brand_name,
        phone_number,
        description,
        address,
        postcode,
        email,
        img_url,
        user_id,
        status: storeDetails.status,
        slug
      }
    });
    const addressBook = await trx.addressBook.create({
      data: {
        first_name: store.brand_name,
        last_name: store.brand_name,
        user_id: store.user_id,
        address: store.address,
        state,
        city,
        street,
        phone_number,
        reference: store.id,
        type: ADDRESS_BOOK_TYPE.STORE_ADDRESS
      }
    });
    await trx.wallet.create({
      data: {
        user_id,
        store_id: store.id
      }
    });
    const role = await trx.role.findUnique({ where: { role: STORE_ROLES.OWNER } });
    if (!role) {
      throw new UnprocessableEntityError('User role not found');
    }
    await trx.storeRole.create({
      data: {
        user_id,
        store_id: store.id,
        role_id: role.id
      }
    });
    return {
      ...store,
      address: addressBook.address,
      phone_number: addressBook.phone_number,
      store_role: role.role
    };
  });
};

export const updateStoreRepo = async (filters: { id: string }, data: Partial<StorePayload>): Promise<Store> => {
  const { brand_name, description, img_url, phone_number, postcode, slug, email, address: addr, status } = data;
  return await prisma.$transaction(async (trx) => {
    const store_address = await trx.addressBook.findFirst({ where: { reference: filters.id } });
    const address: AddressBook = await trx.addressBook.update({
      data: { phone_number },
      where: { id: store_address.id }
    });
    const store = await trx.store.update({
      data: {
        brand_name,
        description,
        address: addr,
        postcode,
        email,
        img_url,
        slug,
        status
      },
      where: filters,
      include: {
        merchant: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true
          }
        },
        store_role: {
          include: {
            role: {
              select: {
                role: true
              }
            }
          }
        }
      }
    });

    return {
      ...store,
      store_role: store.store_role[0].role.role,
      phone_number: address.phone_number
    };
  });
};

export const softDeleteStoreRepo = async (filters: Partial<Store>): Promise<any> => {
  return await prisma.$transaction(async (trx) => {
    const store = await trx.store.updateMany({
      data: { isDeleted: true },
      where: { ...filters }
    });

    return store;
  });
};

export const findStoreRepo = async (filter: Partial<Store>): Promise<Partial<Store> | undefined> => {
  const store: Partial<Store> = await prisma.store.findFirst({
    where: { ...filter, ...globalFilter },
    select: {
      id: true,
      status: true,
      brand_name: true,
      description: true,
      address: true,
      postcode: true,
      phone_number: true,
      email: true,
      slug: true,
      merchant: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          mobile: true
        }
      }
    }
  });
  return store;
};

export const findStoreWithWalletRepo = async (filter: Partial<Store>): Promise<Store | undefined> => {
  const store = await prisma.store.findFirst({
    include: {
      wallet: {
        select: {
          available_balance: true,
          escrow_balance: true
        }
      },
      store_role: {
        select: {
          role: {
            select: {
              role: true
            }
          }
        }
      }
    },
    where: { ...filter, ...globalFilter }
  });
  return store;
};

export const findStoresWithWalletRepo = async (filter?: Partial<Store>): Promise<Store[]> => {
  const stores = await prisma.store.findMany({
    include: {
      wallet: {
        select: {
          available_balance: true,
          escrow_balance: true
        }
      }
    },
    where: { ...filter, ...globalFilter }
  });
  return stores;
};

export const fetchStoresRepo = async (filters?: Partial<Store>): Promise<Partial<Store>[]> => {
  const stores = await prisma.store.findMany({
    where: { ...filters, ...globalFilter },
    select: {
      id: true,
      status: true,
      brand_name: true,
      description: true,
      address: true,
      created_at: true,
      slug: true,
      merchant: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true
        }
      }
    }
  });
  return stores;
};

export const fetchStoresWithRolesRepo = async (filters?: Partial<Store>): Promise<Store[]> => {
  const stores = await prisma.store.findMany({
    where: { ...filters, ...globalFilter },
    include: {
      store_role: {
        include: {
          role: {
            select: {
              role: true
            }
          }
        }
      }
    }
  });
  return stores;
};

export const activateOrDeactivateStoreRepo = async (filters: { id: string }, status: IStatus): Promise<Store> => {
  return await prisma.$transaction(async (trx) => {
    const [existingProducts, existingProductVariants] = await Promise.all([
      trx.product.findMany({ where: { store_id: filters.id } }),
      trx.productVariant.findMany({ where: { store_id: filters.id } })
    ]);

    if (existingProducts.length > 0) {
      await trx.product.updateMany({ data: { status }, where: { store_id: filters.id } });
    }

    if (existingProductVariants.length > 0) {
      await trx.productVariant.updateMany({ data: { status }, where: { store_id: filters.id } });
    }

    const store = await trx.store.update({
      data: {
        status: status ? 'ACTIVE' : 'INACTIVE'
      },
      where: filters
    });

    return store;
  });
};

export const deleteStoreRepo = async (filters: { id: string }): Promise<Store> => {
  const deletedStore = await prisma.store.delete({
    where: filters
  });

  await prisma.product.updateMany({
    data: { isDeleted: true },
    where: { store_id: filters.id }
  });

  return deletedStore;
};
