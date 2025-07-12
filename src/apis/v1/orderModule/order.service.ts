import { fetchCartItemsRepo } from '@src/apis/repositories/cart.repository';
import { BadRequestError } from '@src/common/errors';
import { Order } from '@src/interfaces/order';
import {
  createOrderItemsRepo,
  deleteOrderItemRepo,
  fetchOrderItemsRepo,
  findOrderItemRepo,
  updateOrderItemRepo
} from '../../repositories/order.repository';

import SendboxIntegration from '@src/integrations/sendbox-logistics';
import { User } from '@src/interfaces';
import { ORDER_STATUS } from '@src/constants/order.constant';
import { fetchAddressRepo } from '@src/apis/repositories/addressBook.repository';
import { creditAvailableBalanceRepo, increaseEscrowBalanceRepo } from '@src/apis/repositories/wallet.repository';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@src/constants/transaction.constant';
import { createBulkTransactionRepo, createTransactionRepo } from '@src/apis/repositories/transactions.repository';
import { Transactions } from '@src/interfaces/transactions';
import { logger } from '@src/utilities';
import { NOTIFICATION_ACTIONS, NOTIFICATION_TYPE } from '@src/constants/notification.constant';
import { createBulkNotificationRepo } from '@src/apis/repositories/notification.repository';
import { updateProductVariantSpecRepo } from '@src/apis/repositories/productVariant.repository';

const Sendbox = new SendboxIntegration();

export const createOrderItemsSrv = async (cartIds: string[], user:User, orderInfo: { address_book_id: string; payment_reference: string }) => {
  const { address_book_id, payment_reference } = orderInfo;

  // const getQuote = await Sendbox.Quote.getQuote();
  // console.log(getQuote);

  if (!payment_reference && payment_reference !== 'bazara_test_reference') {
    throw new BadRequestError(`Please provide a valid payment reference`);
  }

  const orderItems = await createOrderItemsRepo({ cart_ids: cartIds, address_book_id, user });
  let transactionRecord: Partial<Transactions[]> = [];
  let notifications = [];

  for (const orderItem of orderItems) {
    const { amount, user_id, store_id, product_variant_spec_id, quantity } = orderItem;
    const metaProps: any = orderItem.meta;
    await increaseEscrowBalanceRepo({ store_id: orderItem.store_id }, Number(orderItem.amount))
    transactionRecord.push(
      {
        amount,
        user_id,
        store_id,
        status: TRANSACTION_STATUS.COMPLETED,
        type: TRANSACTION_TYPE.RECEIVE,
        description: `N${amount} has been added into your escrow wallet`
      }
    )
    const updateProductVariantSpec = await updateProductVariantSpecRepo({ id: product_variant_spec_id }, {
      quantity: {decrement: quantity}
    })
    if (updateProductVariantSpec.quantity < 0) {
     await updateProductVariantSpecRepo(
        { id: product_variant_spec_id },
        {
          quantity: 0
        }
      );
    }
      notifications.push({
        user_id: metaProps.store_details.user_id,
        message: `An order was placed for one of your product`,
        reference: orderItem.id.toString(),
        action: NOTIFICATION_ACTIONS.VIEW,
        type: NOTIFICATION_TYPE.ORDER,
        store_id
      });

  }

  const createTransactions = await createBulkTransactionRepo(transactionRecord);
  await createBulkNotificationRepo(notifications);
  logger.info(`Bulk Transaction created ${createTransactions}`);
  return orderItems;
};

export const orderCheckoutSrv = async (cartIds: string[], user:User, orderInfo: { address_book_id: string; payment_reference: string }) => {
  const { address_book_id, payment_reference } = orderInfo;

 
  const location = await fetchAddressRepo({id: address_book_id})
  const getQuote = await Sendbox.Quote.getQuote({location: location});
 
  const cartItems = await fetchCartItemsRepo({id: {in : cartIds}})
    const cartWithDelivery = cartItems.map(cartItem => {
      
      return {
        ...cartItem,
        delivery_fee: getQuote.delivery_Fee
      }
    })
    const sub_total =  cartWithDelivery.reduce(
      (previousValue, cartWithDelivery) => previousValue + (Number(cartWithDelivery.amount) * cartWithDelivery.quantity),
      0
    )
    const total_delivery_fee = cartWithDelivery.reduce(
      (previousValue, cartWithDelivery) => previousValue + Number(cartWithDelivery.delivery_fee),
      0
    )

  // const orderItem = await createOrderItemsRepo({ cart_ids: cartIds, address_book_id, user });
  return {
    cartWithDelivery,
    sub_total,
    total_delivery_fee
  };
};

export const successOrderRateSrv = async (data:any) => {
  const orders = await fetchOrderItemsRepo({ store_id: data.store_id });
  const totalNumberOfOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === ORDER_STATUS.COMPLETED);
  const totalNumberOfCompletedOrders = completedOrders.length;
  const percentageSuccess = (totalNumberOfCompletedOrders / totalNumberOfOrders)
  return percentageSuccess * 100;
}


export const updateOrderStatusOrderSrv = async (filter: Partial<Order>, data: {status: string, reason:string}) => {
  const orderItem = await findOrderItemRepo({ id: filter.id });
  if (!orderItem) {
    throw new BadRequestError('Record not found');
  }
  const existingMeta = orderItem.meta
  const statusMeta = {
    statusAction: data.status,
    timeStamp: new Date(),
    reason: [ORDER_STATUS.REJECTED, ORDER_STATUS.CANCEL].includes(data.status) ?  data.reason : ""
  }
  const { amount, user_id, store_id } = orderItem
  if (data.status === ORDER_STATUS.COMPLETED) {
    await creditAvailableBalanceRepo({ store_id: orderItem.store_id }, Number(orderItem.amount));
    await createTransactionRepo({
      amount,
      user_id,
      store_id,
      status: TRANSACTION_STATUS.COMPLETED,
      type: TRANSACTION_TYPE.TRANSFER,
      description: `N${amount} has been moved to your available balance`
    });
  }
  let orderStatusMeta = existingMeta?.orderStatusMeta ?? []

  orderStatusMeta.push(statusMeta)

  let updateOrderData = {
    status: data.status,
    meta: {
      ...existingMeta,
      orderStatusMeta
    }
  }

  const updatedOrder = await updateOrderItemRepo({ id: filter.id }, updateOrderData);
  return updatedOrder;
};

export const fetchOrderItemsSrv = async (data: Partial<Order>): Promise<Order[]> => {
  const orderItems = await fetchOrderItemsRepo(data);
  return orderItems;
};

export const updateOrderItemSrv = async (filter: Partial<Order>, data: Partial<Order>): Promise<Order> => {
  const orderItem = await findOrderItemRepo({ id: filter.id });
  if (!orderItem) {
    throw new BadRequestError('Record not found');
  }

  const updatedOrder = await updateOrderItemRepo({ id: filter.id }, data);
  return updatedOrder;
};

export const deleteOrderItemSrv = async (filter: Partial<Order>) => {
  const orderItem = await findOrderItemRepo({ id: filter.id });
  if (!orderItem) {
    throw new BadRequestError('Record not found');
  }
  const deletedOrder = await deleteOrderItemRepo({ id: filter.id });
  return deletedOrder;
};
