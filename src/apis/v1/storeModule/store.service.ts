import { fetchAddressesRepo, findAddressRepo } from '@src/apis/repositories/addressBook.repository';
import { STATUS } from '@src/constants/store.constant';
import { BadRequestError, ConflictError } from '@src/common/errors';
import { IStatus } from '@src/interfaces/generals';
import { Store, StorePayload } from '@src/interfaces/store';
import slug from 'slug';
import {
  activateOrDeactivateStoreRepo,
  createStoreRepo,
  createStoreSpecialRepo,
  deleteStoreRepo,
  fetchStoresRepo,
  fetchStoresWithRolesRepo,
  findStoreRepo,
  findStoreWithWalletRepo,
  updateStoreRepo
} from '../../repositories/store.repository';

export const createStoreSrv = async (store: StorePayload) => {
  // Check if brand name already exists
  const existingStore = await findStoreRepo({ brand_name: store.brand_name });
  if (existingStore) {
    throw new ConflictError('A store with this brand name already exists. Please choose a different name.');
  }

  const createStore = await createStoreRepo({
    ...store,
    slug: slug(store.brand_name + ' ' + store.user_id),
    status: STATUS['IN-REVIEW']
  });

  return createStore;
};

export const createStoreSpecialSrv = async (store: StorePayload) => {
  const createStore = await createStoreSpecialRepo(store);
  return createStore;
};

export const updateStoreSrv = async (filter: Partial<Store>, data: Partial<StorePayload>): Promise<Store> => {
  const store = await findStoreRepo({ ...filter });
  if (!store) {
    throw new BadRequestError('Record not found');
  }
  if (data.brand_name) {
    data = {
      ...data,
      slug: slug(data.brand_name + ' ' + store.user_id)
    };
  }

  const updatedStore = await updateStoreRepo({ id: filter.id }, data);
  return updatedStore;
};

export const findStoreSrv = async (data: Partial<Store>): Promise<Store | undefined> => {
  const store = await findStoreRepo(data);
  if (!store) {
    throw new BadRequestError('Record not found');
  }
  return store;
};

export const findStoreWithWalletSrv = async (filters: Partial<Store>): Promise<Store | undefined> => {
  let store: any = await findStoreWithWalletRepo(filters);
  if (!store || store.length === 0) {
    throw new BadRequestError('Record not found');
  }

  store = {
    ...store,
    storeRole: store.storeRole[0].role.role
  };

  return store;
};

export const fetchStoresSrv = async (filters?: Partial<Store>): Promise<Store[] | Store> => {
  let stores = await fetchStoresWithRolesRepo(filters);
  let addressBook = await fetchAddressesRepo({ user_id: filters.user_id });

  stores = stores.map((store: any) => {
    const storeAddressBook = addressBook.find((address) => address.reference === store.id);

    return {
      ...store,
      city: storeAddressBook?.city,
      state: storeAddressBook?.state,
      street: storeAddressBook?.street,
      phone_number: storeAddressBook?.phone_number,
      store_role: store.store_role[0].role.role
    };
  });

  if (filters.slug || filters.brand_name) {
    let store = stores[0];

    if (!store) {
      throw new BadRequestError('Store not found');
    }
    return store;
  }
  return stores;
};

export const fetchActiveStoresSrv = async (filters?: any): Promise<Store[] | Store> => {
  filters = {
    deleted: null,
    status: STATUS['ACTIVE'],
    ...filters
  };
  let stores = await fetchStoresRepo(filters);
  const store_ids = stores.map((store) => store.id);
  let addressBook = await fetchAddressesRepo({ reference: { in: store_ids } });

  stores = stores.map((store: any) => {
    const { city, state, street } = addressBook.find((address) => address.reference === store.id);
    return {
      ...store,
      city,
      state,
      street
    };
  });

  if (filters.slug || filters.brand_name) {
    let store = stores[0];

    if (!store) {
      throw new BadRequestError('Store not found');
    }
    return store;
  }
  return stores;
};

export const activateOrDeactivateStoreSrv = async (filter: Partial<Store>, status: IStatus): Promise<Store> => {
  const store = await findStoreRepo({ ...filter });
  if (!store) {
    throw new BadRequestError('Record not found');
  }
  const updatedStore = await activateOrDeactivateStoreRepo({ id: filter.id }, status);
  return updatedStore;
};

export const deleteStoreSrv = async (filter: Partial<Store>) => {
  const store = await findStoreRepo({ id: filter.id });

  if (!store) {
    throw new BadRequestError('Record not found');
  }
  const deletedStore = await deleteStoreRepo({ id: filter.id });
  return deletedStore;
};
