import { RATING_TYPE } from '@src/constants/ratings.constant';
import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { fetchProductRatingSrv, rateProductSrv, replyCommentSrv } from './ratings.service';

const RatingsController = {
  rateProduct: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const { product_id, comment, rating } = req.body;
      let ratingsPayload = {
        user_id: id,
        reference: product_id,
        comment,
        rating,
        type: RATING_TYPE.PRODUCT_RATINGS
      };

      const ratings = await rateProductSrv(ratingsPayload);
      respond(res, ratings, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  fetchProductRating: (): RequestHandler => async (req, res, next) => { 
    try {
      const { product_id }= req.query as Record<string, string>;
      
      const ratings = await fetchProductRatingSrv({reference: product_id});
      respond(res, ratings, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  replyComment: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;

      const { comment_id, reply } = req.body;

       await replyCommentSrv({reply, comment_id, user_id: id})
      respond(res, "Reply submitted successfully", StatusCodes.OK);
    } catch (error) {
      next(error)
    }
  }
};

export default RatingsController;
