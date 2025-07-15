import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '@src/common/errors';
import prisma from '@src/apis/middleware/db';
import { USER_ROLES, PERMISSION_RESOURCES, PERMISSION_ACTIONS } from '@src/constants/roles.contant';

interface AuthorizeOptions {
  resource?: string;
  action?: string;
  roles?: string[];
  requireRole?: boolean;
}

export const authorize = (options: AuthorizeOptions = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;
      
      if (!user) {
        return next(new NotAuthorizedError('User not authenticated'));
      }

      // Check if user is deleted
      if (user.isDeleted) {
        return next(new NotAuthorizedError('User account is deleted'));
      }

      // Check if user is active
      if (!user.active) {
        return next(new NotAuthorizedError('User account is not active'));
      }

      // Get user role
      const userWithRole = await prisma.user.findUnique({
        where: { id: user.id },
        include: {
          user_role: {
            include: {
              permissions: true
            }
          },
          permissions: true
        }
      });

      if (!userWithRole) {
        return next(new NotAuthorizedError('User not found'));
      }

      const userRole = userWithRole.user_role;
      const userPermissions = userWithRole.permissions;

      // Check if specific roles are required
      if (options.roles && options.roles.length > 0) {
        if (!userRole || !options.roles.includes(userRole.name)) {
          return next(new NotAuthorizedError(`Access denied. Required roles: ${options.roles.join(', ')}`));
        }
      }

      // Check if role is required but user doesn't have one
      if (options.requireRole && !userRole) {
        return next(new NotAuthorizedError('User role is required'));
      }

      // Check specific permission
      if (options.resource && options.action) {
        const requiredPermission = `${options.resource}.${options.action}`;
        
        // Check if user has the specific permission
        const hasPermission = userPermissions.some(permission => 
          permission.name === requiredPermission
        );

        // Check if user's role has the permission
        const roleHasPermission = userRole?.permissions.some(permission => 
          permission.name === requiredPermission
        );

        if (!hasPermission && !roleHasPermission) {
          return next(new NotAuthorizedError(`Access denied. Required permission: ${requiredPermission}`));
        }
      }

      // Add user role and permissions to request for use in controllers
      res.locals.userRole = userRole;
      res.locals.userPermissions = userPermissions;

      return next();
    } catch (error) {
      return next(new NotAuthorizedError('Authorization failed'));
    }
  };
};

// Convenience middleware for specific roles
export const requireSuperAdmin = authorize({ roles: [USER_ROLES.SUPER_ADMIN] });
export const requireAdmin = authorize({ roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN] });
export const requireMerchant = authorize({ roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MERCHANT] });
export const requireCustomer = authorize({ roles: [USER_ROLES.CUSTOMER] });
export const requireDeliveryPartner = authorize({ roles: [USER_ROLES.DELIVERY_PARTNER] });

// Convenience middleware for specific permissions
export const canManageUsers = authorize({ resource: PERMISSION_RESOURCES.USERS, action: PERMISSION_ACTIONS.MANAGE });
export const canManageStores = authorize({ resource: PERMISSION_RESOURCES.STORES, action: PERMISSION_ACTIONS.MANAGE });
export const canManageProducts = authorize({ resource: PERMISSION_RESOURCES.PRODUCTS, action: PERMISSION_ACTIONS.MANAGE });
export const canManageOrders = authorize({ resource: PERMISSION_RESOURCES.ORDERS, action: PERMISSION_ACTIONS.MANAGE });
export const canViewReports = authorize({ resource: PERMISSION_RESOURCES.REPORTS, action: PERMISSION_ACTIONS.READ });

export default authorize; 