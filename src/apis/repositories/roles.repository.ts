import { PrismaClient } from '@prisma/client';
import { Role } from '@src/interfaces/role';

const prisma = new PrismaClient();

export const createRoleRepo = async (data: Partial<Role>): Promise<Role> => {
  const storeRole = await prisma.role.create({
    data: {
      role: data.role
    }
  });
  return storeRole;
};

export const findRoleRepo = async (filters: { id: string } | { role: string }): Promise<Role | null> => {
  const roles = await prisma.role.findUnique({
    where: filters
  });
  return roles;
};

export const findAllRolesRepo = async (filters: Partial<Role>): Promise<Role[]> => {
  const storeRoles = await prisma.role.findMany({
    where: { ...filters }
  });

  return storeRoles;
};
