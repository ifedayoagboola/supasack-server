import { createWishlistRepo, deleteWishlistRepo, fetchWishlistsRepo, findWishlistRepo } from '@src/apis/repositories/wishlist.repository';
import { BadRequestError } from '@src/common/errors';
import { Wishlist } from '@src/interfaces/wishlist';


export const createWishlistSrv = async (data: Partial<Wishlist>): Promise<Wishlist> => {
  const wishlist = await createWishlistRepo(data);
  return wishlist;
};

export const fetchWishlistSrv = async (data: Partial<Wishlist>): Promise<Wishlist[]> => {
  const wishlist = await fetchWishlistsRepo(data);
  return wishlist;
};

export const deleteWishlistSrv = async (filter: Partial<Wishlist>) => {
  const wishlist = await findWishlistRepo({ id: filter.id });
  if (!wishlist) {
    throw new BadRequestError('Record not found');
  }
  const deletedWishlist = await deleteWishlistRepo({ id: filter.id });
  return deletedWishlist;
};


