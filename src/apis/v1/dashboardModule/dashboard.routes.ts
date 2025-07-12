import authenticate from '@src/apis/middleware/authenticate.middleware';
import { Router } from 'express';
import DashboardController from './dashboard.controller';


const dashboardRouter = Router();

dashboardRouter.get('/wallet_analysis', authenticate(), DashboardController.walletAnalysis());
dashboardRouter.get('/views_analysis', authenticate(), DashboardController.viewsAnalysis());
dashboardRouter.get('/store_analysis', authenticate(), DashboardController.storeAnalysis());
dashboardRouter.get('/activity_analysis', authenticate(), DashboardController.activitiesAnalysis());
dashboardRouter.get('/sales_analysis', authenticate(), DashboardController.storeSalesAnalysis());
dashboardRouter.get('/top_product_analysis', authenticate(), DashboardController.storeProductAnalysis());
export default dashboardRouter;
