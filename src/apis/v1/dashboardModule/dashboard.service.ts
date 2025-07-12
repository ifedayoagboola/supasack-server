import { fetchNotificationRepo } from '@src/apis/repositories/notification.repository';
import { fetchOrderItemsRepo } from '@src/apis/repositories/order.repository';
import { fetchProductsAnalysis, fetchProductsRepo } from '@src/apis/repositories/product.repository';
import { fetchStoresRepo } from '@src/apis/repositories/store.repository';
import { fetchStoreRolesRepo } from '@src/apis/repositories/storeRole.repository';
import { fetchWalletRepo } from '@src/apis/repositories/wallet.repository';
import { ORDER_STATUS } from '@src/constants/order.constant';

export const fetchWalletAnalysisSrv = async (data: {user_id: string, store_id: string}): Promise<any> => {
  const analysis = await fetchWalletRepo(data)
  return analysis;
};

export const fetchActivitiesAnalysisSrv = async (data: {user_id: string, store_id: string}): Promise<any> => {
  const analysis = await fetchNotificationRepo(data);
  return analysis;
};

export const fetchViewsAnalysisSrv = async (data: {user_id: string, store_id: string}): Promise<any> => {
  const analysis = await fetchProductsAnalysis(data);
  return analysis;
};

export const fetchStoreAnalysisSrv = async (data:{user_id: string, store_id: string}): Promise<any> => {
  const stores = await fetchStoresRepo({user_id: data.user_id});
  const products = await fetchProductsRepo(data);
  const roles = await fetchStoreRolesRepo(data)
    return {
      stores: {
        count: stores.length
      },
      products: {
        count: products.length
      },
      roles: {
        count: roles.length
      },
    };
};


export const fetchStoreSalesAnalysisSrv = async (data: { store_id: string }): Promise<any> => {
  // const stores = await fetchStoresRepo({ user_id: data.user_id });
  const storeSales = await fetchOrderItemsRepo({store_id: data.store_id, status: ORDER_STATUS.COMPLETED})
  return [
    {
      month: 'Jan',
      sales: 0
    },
    {
      month: 'Feb',
      sales: 0
    },
    {
      month: 'Mar',
      sales: 0
    },
    {
      month: 'Apr',
      sales: 0
    },
    {
      month: 'May',
      sales: 0
    },
    {
      month: 'Jun',
      sales: 0
    },
    {
      month: 'Jul',
      sales: 0
    },
    {
      month: 'Aug',
      sales: 0
    },
    {
      month: 'Sep',
      sales: 0
    },
    {
      month: 'Oct',
      sales: 0
    },
    {
      month: 'Nov',
      sales: 0
    },
    {
      month: 'Dec',
      sales: storeSales.length
    }
  ];
};

