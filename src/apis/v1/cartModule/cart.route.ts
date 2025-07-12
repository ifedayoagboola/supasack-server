import authenticate from '@src/apis/middleware/authenticate.middleware';
import { createCartSchema, deleteCartSchema, updateCartSchema } from '@src/apis/schemas/cart.schema';
import { Router } from 'express';
import CartController from './cart.controller';

const cartRouter = Router();

cartRouter.post('/create', authenticate(), createCartSchema, CartController.addCartItem());
cartRouter.get('/', authenticate(), CartController.fetchCartItems());
cartRouter.post('/update', authenticate(), updateCartSchema, CartController.updateCartItemDetails());
cartRouter.delete('/delete', authenticate(), deleteCartSchema, CartController.deleteOrDeactivateCartItem());

export default cartRouter;
