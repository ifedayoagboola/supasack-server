import { findProductRepo } from '@src/apis/repositories/product.repository';
import { fetchProductRatingsAndCommentsRepo, findUserCommentRepo, findUserProductRatingRepo, rateProductRepo, replyCommentRepo } from '@src/apis/repositories/ratings.repository';
import { BadRequestError } from '@src/common/errors';
import { Ratings, RatingsPayload, RatingsWithComments } from '@src/interfaces/ratings';


export const  rateProductSrv = async (ratingsDetails: RatingsPayload): Promise<Ratings| string> => {
  const { reference } = ratingsDetails;
  const existingRatings = await findUserProductRatingRepo({ user_id: ratingsDetails.user_id, reference });
  if (existingRatings) {
    return 'You have already rated this product';
  }
  const existingProduct = await findProductRepo({id: reference });

  if (!existingProduct){
    throw new BadRequestError('The product you are trying to rate does not exist')
  }

  const ratings = await rateProductRepo(ratingsDetails);
  return ratings;
};

export const fetchProductRatingSrv = async ({reference}: {reference:string}): Promise<RatingsWithComments[]> => {
  const productRatings = await fetchProductRatingsAndCommentsRepo({reference});
  return productRatings;
};

export const replyCommentSrv = async ({comment_id, user_id, reply}: {comment_id: string, user_id: string, reply: string}): Promise<any> => {
  const existingComment = await findUserCommentRepo({id: comment_id})
  if (!existingComment) {
    throw new BadRequestError('Invalid comment id provided')
  }
  const {reference } = existingComment;
  const payload = {
    comment_id,
    reference,
    user_id,
    reply,
  }
  const replyComment = await replyCommentRepo(payload)
  return replyComment;
}