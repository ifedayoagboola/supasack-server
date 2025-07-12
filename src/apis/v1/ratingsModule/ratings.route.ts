import authenticate from '@src/apis/middleware/authenticate.middleware';
import { fetchRatingsSchema, ratingsSchema } from '@src/apis/schemas/ratings.schema';
import { Router } from 'express';
import RatingsController from './ratings.controller';


const ratingsRouter = Router();

ratingsRouter.post('/create', authenticate(), ratingsSchema, RatingsController.rateProduct());
ratingsRouter.get('/', fetchRatingsSchema, RatingsController.fetchProductRating());
ratingsRouter.post('/comment/reply', authenticate(), RatingsController.replyComment());


export default ratingsRouter;
