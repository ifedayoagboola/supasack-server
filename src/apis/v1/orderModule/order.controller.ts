import { NOTIFICATION_ACTIONS, NOTIFICATION_TYPE } from '@src/constants/notification.constant';
import { ORDER_STATUS } from '@src/constants/order.constant';
import { logger, respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createNotificationSrv } from '../notificationsModule/notification.service';
import { createOrderItemsSrv, deleteOrderItemSrv, fetchOrderItemsSrv, orderCheckoutSrv, successOrderRateSrv, updateOrderItemSrv, updateOrderStatusOrderSrv } from './order.service';
import EmailService from '@src/integrations/email-service';
import { EmailPayload } from '@src/interfaces/emailService';
import { orderEmailNotification } from '@src/integrations/email-service/order_email_template';

const emailService = new EmailService();

const logPrefix = '[ORDER_LOG:]';
const OrderController = {
  createOrderItem: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const user = res.locals.user;

      const { store_id } = req.query as Record<string, string>;

      const { cart_ids, address_book_id, payment_reference } = req.body;
      const userId = id;
      const orders = await createOrderItemsSrv(cart_ids, user, { address_book_id, payment_reference });

      logger.info(`${logPrefix} Order created successfully ${JSON.stringify(orders)}`);

      await createNotificationSrv({
        user_id: id,
        message: `Your order(s) was created successfully`,
        reference: orders[0].id.toString(),
        action: NOTIFICATION_ACTIONS.VIEW,
        type: NOTIFICATION_TYPE.ORDER,
        store_id,
        isStore: false
      });

      respond(res, 'Order created successfully', StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  checkout: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const user = res.locals.user;

      const { cart_ids, address_book_id, payment_reference } = req.body;
    
      const orders = await orderCheckoutSrv(cart_ids, user, { address_book_id, payment_reference });

      logger.info(`${logPrefix} Order created successfully`);

      respond(res, orders, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  fetchOrderItems: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      let filters = {
        ...req.query,
      };
      
      if (!req.query.store_id) {
        filters = {
          ...filters,
          user_id: id
        }
      }

      const userOrderItems = await fetchOrderItemsSrv(filters);
      return respond(res, userOrderItems, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  successOrderRate: (): RequestHandler => async (req, res, next) => {
    try {
      const { store_id } = req.query;
      const rating = await successOrderRateSrv({ store_id })
      return respond(res, {order_success_rating: rating}, StatusCodes.OK )
    } catch (error) {
      next(error);
    }
  },

  updateOrderStatus: (): RequestHandler => async (req, res, next) => {
    try {
      const { order_item_id } = req.query;
      const orderDetails = req.body;
      const updatedOrderItem = await updateOrderStatusOrderSrv({ id: Number(order_item_id) }, orderDetails);
      const orderStatus = updatedOrderItem.status === 'PROCESSING' ? 'PROCESSED' : updatedOrderItem.status;
      const { buyer_details, product_details } = updatedOrderItem?.meta;
      
      let data: EmailPayload = {
        to: buyer_details.email,
        subject: `ORDER ${orderStatus}`,
        body: orderEmailNotification({
          product_name: product_details.name,
          profile_name: `${buyer_details.first_name}`,
          quantity: 1,
          price: Number(updatedOrderItem.amount),
          order_status: orderStatus,
          img_url: updatedOrderItem.variant_img_url
        })
      };

      let notificationMessages = "";

      switch (updatedOrderItem.status) {
        case ORDER_STATUS.CANCEL:
          notificationMessages = 'Sorry, your order was cancelled by the seller';
          await emailService.EmailNotification.emailNotification(data);
          break;
        case ORDER_STATUS.REJECTED:
          notificationMessages = 'Sorry, your order was rejected by the seller';
          await emailService.EmailNotification.emailNotification(data);
          break;
        case ORDER_STATUS.PROCESSING:
          notificationMessages = 'Your order is being processed';
          await emailService.EmailNotification.emailNotification(data);
          break;
        case ORDER_STATUS.INPROGRESS:
          notificationMessages = 'Your order is being processed';
          break;
        case ORDER_STATUS.COMPLETED:
          notificationMessages = 'Your order has been completed';
          await emailService.EmailNotification.emailNotification(data);
          break;
        case ORDER_STATUS.DISPATCHED:
          notificationMessages = 'Your order has been dispatched';
          await emailService.EmailNotification.emailNotification(data);
          break;
        default:
          notificationMessages = `Your order(s) was ${updatedOrderItem.status}`;
          break;
      }

        await createNotificationSrv({
          user_id: updatedOrderItem.user_id,
          message: notificationMessages,
          reference: updatedOrderItem.id.toString(),
          action: NOTIFICATION_ACTIONS.VIEW,
          type: NOTIFICATION_TYPE.ORDER,
          store_id: updatedOrderItem.store_id,
          isStore: false
        });

      return respond(res, updatedOrderItem, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  updateOrderItemDetails: (): RequestHandler => async (req, res, next) => {
    try {
      const { order_item_id } = req.query;
      const orderDetails = req.body;
      const updatedOrderItem = await updateOrderItemSrv({ id: Number(order_item_id) }, orderDetails);

      return respond(res, updatedOrderItem, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  deleteOrDeactivateOrderItem: (): RequestHandler => async (req, res, next) => {
    try {
      const order_item_id = req.params.order_item_id;
      const deletedOrderItem = await deleteOrderItemSrv({ id: Number(order_item_id) });
      return respond(res, deletedOrderItem, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default OrderController;
