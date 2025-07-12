
import { fetchProductsRepo } from '@src/apis/repositories/product.repository';
import { STATUS } from '@src/constants/store.constant';
import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { fetchActivitiesAnalysisSrv, fetchStoreAnalysisSrv, fetchStoreSalesAnalysisSrv, fetchViewsAnalysisSrv, fetchWalletAnalysisSrv } from './dashboard.service';


const DashboardController = {
  walletAnalysis: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const storeId = req.query.store_id;
      
      const analysis = await fetchWalletAnalysisSrv({user_id: id, store_id: storeId.toString()});
      respond(res, analysis, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  activitiesAnalysis: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const storeId = req.query.store_id;
      const analysis = await fetchActivitiesAnalysisSrv({user_id: id, store_id: storeId.toString()});
      respond(res, analysis, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  viewsAnalysis: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const storeId = req.query.store_id;

      const analysis = await fetchViewsAnalysisSrv({user_id: id, store_id: storeId.toString()});
      respond(res, analysis, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  storeAnalysis: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const storeId = req.query.store_id;

      const analysis = await fetchStoreAnalysisSrv({user_id: id, store_id: storeId.toString()});
      return respond(res, analysis, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  storeSalesAnalysis: (): RequestHandler => async (req, res, next) => {
    try {
      const storeId = req.query.store_id;
      const analysis = await fetchStoreSalesAnalysisSrv({ store_id: storeId.toString() });
      return  respond(res, analysis, StatusCodes.OK)
    } catch (error) {
      next(error)
    }
  },

  storeProductAnalysis: (): RequestHandler => async (req, res, next) => {
    try {
      const storeId = req.query.store_id;
      const products = await fetchProductsRepo({ status: STATUS.ACTIVE, store_id: storeId });
      const topViewedProduct = products.slice(0, 5).map((product) => {
        return {
          id: product.id,
          name: product.name,
          views: product.views
        }
      })
      
      return respond(res, topViewedProduct, StatusCodes.OK);
    } catch (error) {
      next(error)
    }
  }
};

export default DashboardController;
