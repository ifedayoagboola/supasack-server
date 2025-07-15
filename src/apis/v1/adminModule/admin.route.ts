import { Router } from 'express';
import authenticate from '@src/apis/middleware/authenticate.middleware';
import { requireSuperAdmin, requireAdmin, canManageUsers, canManageStores } from '@src/apis/middleware/authorize.middleware';
import AdminController from './admin.controller';

const adminRouter = Router();

// All admin routes require authentication
adminRouter.use(authenticate());

// User management routes (Super Admin only)
adminRouter.get('/users', requireSuperAdmin, AdminController.getAllUsers());
adminRouter.get('/users/:userId', requireSuperAdmin, AdminController.getUserById());
adminRouter.post('/users/:userId/role', requireSuperAdmin, AdminController.assignUserRole());

// Role management routes (Super Admin only)
adminRouter.get('/roles', requireSuperAdmin, AdminController.getAllRoles());
adminRouter.post('/roles', requireSuperAdmin, AdminController.createRole());
adminRouter.put('/roles/:roleId', requireSuperAdmin, AdminController.updateRole());
adminRouter.delete('/roles/:roleId', requireSuperAdmin, AdminController.deleteRole());

// Permission management routes (Super Admin only)
adminRouter.get('/permissions', requireSuperAdmin, AdminController.getAllPermissions());

// Platform statistics (Admin and Super Admin)
adminRouter.get('/stats', requireAdmin, AdminController.getPlatformStats());

export default adminRouter; 