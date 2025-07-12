import authenticate from '@src/apis/middleware/authenticate.middleware';
import { createRoleSchema } from '@src/apis/schemas/role.schema';
import { Router } from 'express';
import RolesController from './roles.controller';

const roleRouter = Router();

roleRouter.get('/', authenticate(), RolesController.getAllRoles());
roleRouter.post('/', createRoleSchema, RolesController.createRole());

export default roleRouter;
