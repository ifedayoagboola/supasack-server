import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addCartItemSrv, deleteCartItemSrv, fetchCartItemsSrv, updateCartItemSrv } from './cart.service';

const CartController = {
  addCartItem: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const { product_id, product_variant_id, product_variant_spec_id, quantity } = req.body;
      const cartItem = await addCartItemSrv({
        user_id: id,
        product_id,
        product_variant_id,
        product_variant_spec_id,
        quantity
      });
      respond(res, cartItem, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  fetchCartItems: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const filters = {
        ...req.query,
        user_id: id
      };
      const userCartItems = await fetchCartItemsSrv(filters);
      return respond(res, userCartItems, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  updateCartItemDetails: (): RequestHandler => async (req, res, next) => {
    try {
      const { cart_id } = req.query as Record<string, string>;
      const cartItemDetails = req.body;
      const updatedCartItem = await updateCartItemSrv({ id: cart_id }, cartItemDetails);

      return respond(res, updatedCartItem, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  deleteOrDeactivateCartItem: (): RequestHandler => async (req, res, next) => {
    try {
      const { cart_id } = req.query as Record<string, string>;
      const deletedCartItem = await deleteCartItemSrv({ id: cart_id });
      return respond(res, 'Item deleted successfully', StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default CartController;
