import authenticate from '@src/apis/middleware/authenticate.middleware';
import { activateOrDeactivateStoreSchema, createStoreSchema, fetchStoreSchema, updateStoreSchema } from '@src/apis/schemas/store.schema';
import { STATUS } from '@src/constants/store.constant';
import { IStatus } from '@src/interfaces/generals';
import { Router } from 'express';
import StoreRoleController from '../storeRoleModule/storeRole.controller';
import StoreController from './store.controller';

const storeRouter = Router();

storeRouter.post('/create', authenticate(), createStoreSchema, StoreController.create());
storeRouter.post('/createSpecial', StoreController.createSpecial());
storeRouter.get('/seller', authenticate(), fetchStoreSchema, StoreController.getAllSellerStores());
storeRouter.get('/', fetchStoreSchema, StoreController.fetchStores());
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
storeRouter.delete('/delete', authenticate(), StoreController.deleteStore());

export default storeRouter;
