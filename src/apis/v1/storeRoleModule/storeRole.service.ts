import { fetchAddressesRepo } from '@src/apis/repositories/addressBook.repository';
import { findStoreRepo } from '@src/apis/repositories/store.repository';
import { STORE_ROLES } from '@src/constants/roles.contant';
import { BadRequestError } from '@src/common/errors';
import { StoreRole } from '@src/interfaces/role';
import { findUserRepo } from '../../repositories/auth.repository';
import { findRoleRepo } from '../../repositories/roles.repository';
import { createStoreRoleRepo, deleteStoreRoleRepo, fetchStoreRolesRepo, fetchStoresWithRolesRepo, findStoreRoleRepo, updateStoreRoleRepo } from '../../repositories/storeRole.repository';

export const createStoreRoleSrv = async (data: any): Promise<StoreRole> => {
  const { store_id, role_id, created_by } = data;
  const store = await findStoreRepo({ id: store_id })

  if (!store) {
    throw new BadRequestError('Store with the provided id not found');
  }

  const foundUser = await findUserRepo({ email: data.email });
  if (!foundUser) {
    throw new BadRequestError('This user does not exist! Only existing users can be added to the store role');
  }
  const findRole = await findRoleRepo({ id: role_id });
  if (!findRole) {
    throw new BadRequestError('Role does not exist');
  }

  if (findRole.role === STORE_ROLES.OWNER) {
    throw new BadRequestError('Only the creator of the store can be the store owner');
  }

  const existingStoreRole: any = await findStoreRoleRepo({ user_id: foundUser.id, store_id });
  if (existingStoreRole) {
    if (existingStoreRole.role?.role === STORE_ROLES.OWNER) {
      throw new BadRequestError('You are not permitted to switch owners role');
    }
    throw new BadRequestError('A role as been assigned to this user already, please kindly update user role.');
  }

  const storeRole = await createStoreRoleRepo({ user_id: foundUser.id, store_id, created_by, role_id: findRole.id });
  return storeRole;
};

export const getAllAssignedStoresSrv = async (data: Partial<StoreRole>) => {
  const addressBook = await fetchAddressesRepo({ user_id: data.user_id });

  let assignedStores: any[] = await fetchStoresWithRolesRepo(data);
  assignedStores = assignedStores.map((store) => {
    const address = addressBook.find((address) => address.reference === store.id);
    const { city, state, street } = address;
    return {
      ...store.store,
      city,
      state,
      street,
      store_role: store.role.role
    };
  });

  return assignedStores;
};

export const getStoreRolesSrv = async (data: any) => {
  const storeRoles = await fetchStoreRolesRepo(data);
  if (!storeRoles || storeRoles.length === 0) {
    throw new BadRequestError('Roles not found for this store');
  }
  return storeRoles;
};

export const updateStoreRoleSrv = async (filter: Partial<StoreRole>, data: Partial<StoreRole>): Promise<StoreRole> => {
  const storeRole = await findStoreRoleRepo({ id: filter.id });
  if (!storeRole) {
    throw new BadRequestError('A user with this role was not found');
  }

  const role = await findRoleRepo({ id: storeRole.role_id });

  if (role && role.role === STORE_ROLES.OWNER) {
    throw new BadRequestError('You cannot update a store owner role');
  }

  const updatedStoreRole = await updateStoreRoleRepo({ id: filter.id }, data);
  return updatedStoreRole;
};

export const deleteStoreRoleSrv = async (filter: Partial<StoreRole>) => {
  const storeRole = await findStoreRoleRepo({ id: filter.id });

  if (!storeRole) {
    throw new BadRequestError('This role was not found');
  }
  const role = await findRoleRepo({ id: storeRole.role_id });

  if (role && role.role === STORE_ROLES.OWNER) {
    throw new BadRequestError('You cannot delete the store owner role');
  }

  const deletedStoreRole = await deleteStoreRoleRepo({ id: filter.id });
  return deletedStoreRole;
};
