import authenticate from '@src/apis/middleware/authenticate.middleware';
import { Router } from 'express';
import OrderController from './order.controller';

const orderRouter = Router();

orderRouter.post('/checkout', authenticate(), OrderController.checkout());
orderRouter.post('/create', authenticate(), OrderController.createOrderItem());
orderRouter.get('/', authenticate(),  OrderController.fetchOrderItems());
orderRouter.post('/update/status', authenticate(), OrderController.updateOrderStatus());
orderRouter.delete('/delete', authenticate(), OrderController.deleteOrDeactivateOrderItem());
orderRouter.get('/order_success', OrderController.successOrderRate())


export default orderRouter;
