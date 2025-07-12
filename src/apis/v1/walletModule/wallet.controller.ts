import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getStoreWalletSrv } from './wallet.service';

const WalletController = {
  getStoreWallet: (): RequestHandler => async (req, res, next) => {
    try {
      console.log('here');
      const { store_id } = req.query as Record<string, string>;
      const wallet = await getStoreWalletSrv({ store_id: store_id });
      respond(res, wallet, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default WalletController;
