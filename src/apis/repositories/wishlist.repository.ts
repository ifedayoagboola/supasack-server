import { PrismaClient } from '@prisma/client';
import { Wishlist } from '@src/interfaces/wishlist';

const prisma = new PrismaClient();

export const createWishlistRepo = async (wishlistDetails: Partial<Wishlist>): Promise<Wishlist> => {
  const Wishlist = await prisma.wishlist.create({
    data: {
      user_id: wishlistDetails.user_id,
      product_id: wishlistDetails.product_id
    }
  });
  return Wishlist;
};

export const fetchWishlistsRepo = async (filter: Partial<Wishlist>): Promise<any[]> => {
  return await prisma.$transaction(async (trx) => {
    const wishlist = await trx.wishlist.findMany({
      where: { ...filter }
    });
    const product_ids = wishlist.map(wishlist => wishlist.product_id)
    const products = await trx.product.findMany({ 
      where:{ id: { in: product_ids }},
      include: {
        product_variants: true
      }
    })
   const populatedWishlist = wishlist.map(wishlist => {
     const details = products.find((product) => product.id === wishlist.product_id)
      const newWishlist = {
        ...wishlist,
        product_details: {
          ...details,
          product_variants: details?.product_variants[0]
        }
      }
      return newWishlist;
    });
    return populatedWishlist;
  })
};

export const findWishlistRepo = async (filter: { id: string }): Promise<Wishlist | null> => {
  const Wishlist = await prisma.wishlist.findUnique({
    where: filter
  });
  return Wishlist;
};

export const updateWishlistRepo = async (filters: { id: string }, data: Partial<Wishlist>): Promise<Wishlist> => {
  const Wishlist = await prisma.wishlist.update({
    data: {
      ...data
    },
    where: filters
  });
  return Wishlist;
};

export const deleteWishlistRepo = async (filters: { id: string }): Promise<Wishlist> => {
  const Wishlist = await prisma.wishlist.delete({
    where: filters
  });
  return Wishlist;
};
