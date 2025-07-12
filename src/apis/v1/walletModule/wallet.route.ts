import authenticate from '@src/apis/middleware/authenticate.middleware';
import { fetchStoreWalletSchema } from '@src/apis/schemas/store.schema';
import { Router } from 'express';
import WalletController from './wallet.controller';

const walletRouter = Router();

walletRouter.get('/', authenticate(), fetchStoreWalletSchema, WalletController.getStoreWallet());

export default walletRouter;
