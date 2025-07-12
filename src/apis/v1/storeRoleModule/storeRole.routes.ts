import authenticate from '@src/apis/middleware/authenticate.middleware';
import { createStoreRoleSchema, deleteStoreRoleSchema, fetchStoreRoleSchema, updateStoreRoleSchema } from '@src/apis/schemas/role.schema';
import { Router } from 'express';
import StoreRoleController from './storeRole.controller';

const storeRoleRouter = Router();

storeRoleRouter.get('/stores', authenticate(), StoreRoleController.findStoresAssignedToRoles());
storeRoleRouter.get('/', authenticate(), fetchStoreRoleSchema, StoreRoleController.fetchStoreRoles());
storeRoleRouter.post('/create', authenticate(), createStoreRoleSchema, StoreRoleController.createStoreRole());
storeRoleRouter.post('/update', authenticate(), updateStoreRoleSchema, StoreRoleController.updateStoreRole());
storeRoleRouter.delete('/delete', authenticate(), deleteStoreRoleSchema, StoreRoleController.deleteStoreRole());

export default storeRoleRouter;
