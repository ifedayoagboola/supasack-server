import { PrismaClient } from '@prisma/client';
import { StoreRole } from '@src/interfaces/role';

const prisma = new PrismaClient();

export const createStoreRoleRepo = (data: Partial<StoreRole>): Promise<StoreRole> => {
  const storeRole = prisma.storeRole.create({
    data: {
      user_id: data.user_id,
      store_id: data.store_id,
      role_id: data.role_id,
      created_by: data.created_by
    }
  });

  return storeRole;
};

export const findStoreRoleRepo = (filters: Partial<StoreRole>): Promise<StoreRole> => {
  const storeRole = prisma.storeRole.findFirst({
    include: {
      role: {
        select: {
          role: true
        }
      }
    },
    where: { ...filters }
  });

  return storeRole;
};

export const fetchStoreRolesRepo = (filters: Partial<StoreRole>): Promise<StoreRole[]> => {
  const storeRole = prisma.storeRole.findMany({
    include: {
      role: {
        select: {
          role: true
        }
      },
      user: {
        select: {
          first_name: true,
          last_name: true,
          email: true
        }
      }
    },
    where: { ...filters }
  });

  return storeRole;
};

export const fetchStoresWithRolesRepo = (filters: Partial<StoreRole>): Promise<StoreRole[]> => {
  const storeRole = prisma.storeRole.findMany({
    include: {
      store: true,
      role: {
        select: {
          role: true
        }
      }
    },
    where: { ...filters }
  });

  return storeRole;
};
export const findStoreRoleWithStoreAndWalletRepo = (filters: Partial<StoreRole>): Promise<StoreRole[]> => {
  const storeRole = prisma.storeRole.findMany({
    include: {
      store: {
        include: {
          wallet: {
            select: {
              available_balance: true,
              escrow_balance: true
            }
          }
        }
      },
      role: {
        select: {
          role: true
        }
      }
    },
    where: { ...filters }
  });

  return storeRole;
};

export const updateStoreRoleRepo = async (filters: { id: string }, data: Partial<StoreRole>): Promise<StoreRole> => {
  const updatedStoreRole = await prisma.storeRole.update({
    data: data,
    where: filters
  });
  return updatedStoreRole;
};

export const deleteStoreRoleRepo = async (filters: { id: string }): Promise<StoreRole> => {
  const deletedStoreRole = await prisma.storeRole.delete({
    where: filters
  });
  return deletedStoreRole;
};
