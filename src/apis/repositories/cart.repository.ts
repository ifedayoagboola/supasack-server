import { PrismaClient } from '@prisma/client';
import { Cart } from '@src/interfaces/cart';

const prisma = new PrismaClient();
type CartFetch = Omit<Cart, 'meta'>;

export const createCartItemRepo = async (cartItemDetails: Cart): Promise<Cart> => {
  const cartItem = await prisma.cart.create({
    data: cartItemDetails
  });
  return cartItem;
};

export const fetchCartItemsRepo = async (filter: Partial<CartFetch | any>): Promise<Cart[]> => {
  const cart = await prisma.cart.findMany({
    where: { ...filter }
  });
  return cart;
};

export const findCartItemRepo = async (filter: Partial<Cart>): Promise<Cart | null> => {
  const cart = await prisma.cart.findFirst({
    where: { ...filter }
  });
  return cart;
};

export const updateCartItemRepo = async (filters: { id: string }, data: Partial<Cart>): Promise<Cart> => {
  const cart = await prisma.cart.update({
    data: {
      ...data
    },
    where: filters
  });
  return cart;
};

export const deleteCartItemRepo = async (filters: { id: string }): Promise<Cart> => {
  const cart = await prisma.cart.delete({
    where: filters
  });
  return cart;
};
