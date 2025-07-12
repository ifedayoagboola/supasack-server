import { PrismaClient } from '@prisma/client';
import { RATING_TYPE } from '@src/constants/ratings.constant';
import { CommentReplies, Comments, Ratings, RatingsPayload } from '@src/interfaces/ratings';

const prisma = new PrismaClient();

export const rateProductRepo = async (ratingPayload: RatingsPayload): Promise<Ratings> => {
  const {comment, user_id, reference, rating, type } = ratingPayload;
  return await prisma.$transaction(async (trx) => {
    const ratings = await trx.ratings.create({
      data: {
        user_id,
        reference,
        rating,
        type
      }
    })
    await trx.comments.create({
      data: {
        comment,
        user_id,
        rating_id: ratings.id,
        reference
      }
    })
    const ratingsAndComments =  await trx.ratings.findMany({
      where: {reference},
      include: {
        comment: {
          include: {
            comment_reply: true
          }
        }
      }
    })

    const totalRatingsCount = ratingsAndComments.length;
    const totalRatings = ratingsAndComments.reduce((totalRatings, rating) => totalRatings + rating.rating, 0);
    const averageRatings = totalRatings / totalRatingsCount
    
    await trx.product.update({data: {rating: averageRatings},  where: { id: reference } });

    return ratingsAndComments.find((rating) => rating.id === ratings.id);
  })
};

export const findUserProductRatingRepo = async (filter: Partial<Ratings>): Promise<Ratings> => {
  const productRating = await prisma.ratings.findFirst({
    where: {...filter}
  });

  return productRating;
};

export const findUserCommentRepo = async (filter: Partial<Comments>): Promise<Comments | undefined> => { 
  console.log(filter)
  const comment = await prisma.comments.findFirst({
    where: {...filter}
  })

  return comment
};

export const replyCommentRepo = async (data: Partial<CommentReplies>): Promise<CommentReplies> => {
   const { comment_id, user_id, reply, reference} = data;
  const commentReply = await prisma.commentReplies.create({
      data: {
        comment_id,
        user_id,
        reply,
        reference
      }
    })

    return commentReply
  };
  
export const fetchProductRatingsAndCommentsRepo = async (filter: Partial<Ratings>): Promise<any[]> => {
  return await prisma.$transaction(async (trx) => { 
    let productRatings = await trx.ratings.findMany({
      where: {...filter, type: RATING_TYPE.PRODUCT_RATINGS},
      include: {
        comment: {
          include:{
            comment_reply: true
          }
        },
        user: {
          select:{
            img_url:true,
            first_name: true,
            last_name: true
          }
        }
      }
    });
    const productIds = productRatings.map(productRating => productRating.reference)
    const productDetails = await trx.product.findMany({
      where: { id: {in: productIds}},    
      include: {
        store: {
          select: {
            brand_name: true,
            slug: true,
            logo: true,
            img_url: true,
            description: true
          }
        }
      },
    })
      const ratings: any[] = productRatings.map(rating => {
        const detail = productDetails.map(product => {
          if (product.id === rating.reference) {
            const detail = {
              name: product.name,
              slug: product.slug,
              description: product.description,
              store: product.store
            }
            return detail;
          }
        })
          return {
            id: rating.id,
            rating: rating.rating,
            user: rating.user,
            comment: {
              id: rating?.comment?.id,
              comment:rating?.comment?.comment,
              reply: rating?.comment?.comment_reply?.reply || null
            },
            product_details: detail[0]
          }
      })
    return ratings

  })
};
