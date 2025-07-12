import authenticate from '@src/apis/middleware/authenticate.middleware';
import { createRoleSchema } from '@src/apis/schemas/role.schema';
import { Router } from 'express';
import WishlistController from './wishlist.controller';


const wishlistRouter = Router();

wishlistRouter.post('/', authenticate(), WishlistController.create());
wishlistRouter.get('/', authenticate(), WishlistController.fetchWishlistItems());
wishlistRouter.delete('/', authenticate(), WishlistController.deleteWishlistItem());

export default wishlistRouter;
