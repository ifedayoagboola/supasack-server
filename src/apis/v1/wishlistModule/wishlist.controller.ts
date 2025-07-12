
import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createWishlistSrv, deleteWishlistSrv, fetchWishlistSrv } from './wishlist.service';


const WishlistController = {
  create: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      let product_id = req.body.product_id;
      const wishlist = {
        product_id,
        user_id: id
      };
      const store = await createWishlistSrv(wishlist);
      respond(res, store, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  fetchWishlistItems: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
        let filters = {
          user_id: id
        }
      const userWishlistItems = await fetchWishlistSrv(filters);
      return respond(res, userWishlistItems, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  deleteWishlistItem: (): RequestHandler => async (req, res, next) => {
    try {
      const wishlist_item_id = req.query.wishlist_item_id;
      await deleteWishlistSrv({ id: wishlist_item_id.toString() });
      return respond(res, "Item removed successfully", StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }

  
};

export default WishlistController;
