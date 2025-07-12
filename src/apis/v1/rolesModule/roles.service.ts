import { BadRequestError } from '@src/common/errors';
import { Role } from '@src/interfaces/role';
import { createRoleRepo, findAllRolesRepo, findRoleRepo } from '../../repositories/roles.repository';

export const createRoleSrv = async (data: Partial<Role>): Promise<Role> => {
  const existingRole = await findRoleRepo({ role: data.role });
  if (existingRole) {
    throw new BadRequestError('Role already exists');
  }
  const createdRole = await createRoleRepo(data);
  return createdRole;
};

export const getAllRolesSrv = async (): Promise<Role[]> => {
  const allRoles = await findAllRolesRepo({});
  return allRoles;
};
