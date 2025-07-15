import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { respond } from '@src/utilities';
import { logger } from '@src/utilities';
import { BadRequestError } from '@src/common/errors';
import { USER_ROLES } from '@src/constants/roles.contant';
import { 
  findUserRepo, 
  updateUserRepo, 
  assignUserRoleRepo,
  getUserRoleRepo,
  getUserPermissionsRepo 
} from '@src/apis/repositories/auth.repository';
import prisma from '@src/apis/middleware/db';

const logPrefix = '[AdminController]';

const AdminController = {
  // Get all users with their roles
  getAllUsers: (): RequestHandler => async (req, res, next) => {
    try {
      const { page = 1, limit = 10, role, search } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const where: any = { isDeleted: false };
      
      if (role) {
        where.user_role = { name: role };
      }
      
      if (search) {
        where.OR = [
          { first_name: { contains: search as string, mode: 'insensitive' } },
          { last_name: { contains: search as string, mode: 'insensitive' } },
          { email: { contains: search as string, mode: 'insensitive' } }
        ];
      }

      const users = await prisma.user.findMany({
        where,
        include: {
          user_role: {
            include: {
              permissions: true
            }
          },
          permissions: true
        },
        skip,
        take: Number(limit),
        orderBy: { created_at: 'desc' }
      });

      const total = await prisma.user.count({ where });

      respond(res, {
        users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  // Get user by ID with role and permissions
  getUserById: (): RequestHandler => async (req, res, next) => {
    try {
      const { userId } = req.params;
      
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          user_role: {
            include: {
              permissions: true
            }
          },
          permissions: true
        }
      });

      if (!user) {
        throw new BadRequestError('User not found');
      }

      respond(res, user, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  // Assign role to user
  assignUserRole: (): RequestHandler => async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { roleId } = req.body;

      const user = await findUserRepo({ id: userId });
      if (!user) {
        throw new BadRequestError('User not found');
      }

      const role = await prisma.userRole.findUnique({
        where: { id: roleId }
      });
      if (!role) {
        throw new BadRequestError('Role not found');
      }

      const updatedUser = await assignUserRoleRepo(userId, roleId);

      logger.info(`${logPrefix} Role ${role.name} assigned to user ${userId}`);

      respond(res, updatedUser, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  // Get all roles
  getAllRoles: (): RequestHandler => async (req, res, next) => {
    try {
      const roles = await prisma.userRole.findMany({
        include: {
          permissions: true,
          _count: {
            select: { users: true }
          }
        },
        orderBy: { level: 'desc' }
      });

      respond(res, roles, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  // Get all permissions
  getAllPermissions: (): RequestHandler => async (req, res, next) => {
    try {
      const permissions = await prisma.userPermission.findMany({
        orderBy: { name: 'asc' }
      });

      respond(res, permissions, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  // Create new role
  createRole: (): RequestHandler => async (req, res, next) => {
    try {
      const { name, description, level, permissions } = req.body;

      const existingRole = await prisma.userRole.findUnique({
        where: { name }
      });

      if (existingRole) {
        throw new BadRequestError('Role with this name already exists');
      }

      const role = await prisma.userRole.create({
        data: {
          name,
          description,
          level: level || 0,
          permissions: permissions ? {
            connect: permissions.map((id: string) => ({ id }))
          } : undefined
        },
        include: {
          permissions: true
        }
      });

      logger.info(`${logPrefix} New role created: ${name}`);

      respond(res, role, StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  },

  // Update role
  updateRole: (): RequestHandler => async (req, res, next) => {
    try {
      const { roleId } = req.params;
      const { name, description, level, permissions } = req.body;

      const existingRole = await prisma.userRole.findUnique({
        where: { id: roleId }
      });

      if (!existingRole) {
        throw new BadRequestError('Role not found');
      }

      // Check if name is being changed and if it conflicts
      if (name && name !== existingRole.name) {
        const nameConflict = await prisma.userRole.findUnique({
          where: { name }
        });
        if (nameConflict) {
          throw new BadRequestError('Role with this name already exists');
        }
      }

      const updatedRole = await prisma.userRole.update({
        where: { id: roleId },
        data: {
          name,
          description,
          level,
          permissions: permissions ? {
            set: permissions.map((id: string) => ({ id }))
          } : undefined
        },
        include: {
          permissions: true
        }
      });

      logger.info(`${logPrefix} Role updated: ${updatedRole.name}`);

      respond(res, updatedRole, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  // Delete role
  deleteRole: (): RequestHandler => async (req, res, next) => {
    try {
      const { roleId } = req.params;

      const role = await prisma.userRole.findUnique({
        where: { id: roleId },
        include: {
          _count: {
            select: { users: true }
          }
        }
      });

      if (!role) {
        throw new BadRequestError('Role not found');
      }

      if (role._count.users > 0) {
        throw new BadRequestError('Cannot delete role that has users assigned');
      }

      await prisma.userRole.delete({
        where: { id: roleId }
      });

      logger.info(`${logPrefix} Role deleted: ${role.name}`);

      respond(res, { message: 'Role deleted successfully' }, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  // Get platform statistics
  getPlatformStats: (): RequestHandler => async (req, res, next) => {
    try {
      const [
        totalUsers,
        totalStores,
        totalProducts,
        totalOrders,
        usersByRole
      ] = await Promise.all([
        prisma.user.count({ where: { isDeleted: false } }),
        prisma.store.count({ where: { isDeleted: false } }),
        prisma.product.count({ where: { isDeleted: false } }),
        prisma.order.count(),
        prisma.userRole.findMany({
          include: {
            _count: {
              select: { users: true }
            }
          }
        })
      ]);

      respond(res, {
        totalUsers,
        totalStores,
        totalProducts,
        totalOrders,
        usersByRole
      }, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default AdminController; 