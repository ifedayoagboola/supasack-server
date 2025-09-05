import authenticate from '@src/apis/middleware/authenticate.middleware';
import {
  activateOrDeactivateStoreSchema,
  createMerchantStoreSchema,
  createStoreSchema,
  fetchStoreSchema,
  updateMerchantStoreSchema,
  updateStoreSchema
} from '@src/apis/schemas/store.schema';
import { STATUS } from '@src/constants/store.constant';
import { IStatus } from '@src/interfaces/generals';
import { Router } from 'express';
import StoreRoleController from '../storeRoleModule/storeRole.controller';
import StoreController from './store.controller';
import { requireAdmin } from '@src/apis/middleware/authorize.middleware';

const storeRouter = Router();

storeRouter.post('/create', authenticate(), createStoreSchema, StoreController.create());
storeRouter.post('/admin/create', authenticate(), createMerchantStoreSchema, StoreController.create());
storeRouter.post('/createSpecial', StoreController.createSpecial());
storeRouter.get('/seller', authenticate(), fetchStoreSchema, StoreController.getAllSellerStores());
 storeRouter.get('/', fetchStoreSchema, StoreController.fetchStores());
storeRouter.get('/:storeId', authenticate(), StoreController.getStoreById());
storeRouter.get('/test-email-config', StoreController.testEmailConfig());
storeRouter.get('/test-smtp-connection', StoreController.testSmtpConnection());
storeRouter.get('/test-email-sending', StoreController.testEmailSending());

storeRouter.post(
  '/activate',
  authenticate(),
  activateOrDeactivateStoreSchema,
  StoreController.activateOrDeactivateStore(STATUS['ACTIVE'] as IStatus)
);
storeRouter.post(
  '/deactivate',
  authenticate(),
  activateOrDeactivateStoreSchema,
  StoreController.activateOrDeactivateStore(STATUS['INACTIVE'] as IStatus)
);

storeRouter.post('/update', authenticate(), updateStoreSchema, StoreController.updateStoreDetails());
storeRouter.put('/admin/:storeId', authenticate(), requireAdmin, updateMerchantStoreSchema, StoreController.updateAdminStoreDetails());
storeRouter.delete('/:storeId', authenticate(), StoreController.deleteStore());

export default storeRouter;
