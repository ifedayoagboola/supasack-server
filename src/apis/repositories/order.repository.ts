import { PrismaClient } from '@prisma/client';
import { ORDER_STATUS } from '@src/constants/order.constant';
import { BadRequestError } from '@src/common/errors';
import { User } from '@src/interfaces';
import { Cart } from '@src/interfaces/cart';
import { Order } from '@src/interfaces/order';
import { Product } from '@src/interfaces/product';
import cuid from 'cuid';

const prisma = new PrismaClient();

interface OrderInfoPayload {
  address_book_id: string;
  user: User;
  cart_ids: string[];
}
export const createOrderItemsRepo = async (orderInfoPayload: OrderInfoPayload) => {
  const { address_book_id, user, cart_ids } = orderInfoPayload;

    const orderReference = cuid();

    const cartItems = await prisma.cart.findMany({ where: { id: { in: cart_ids } } });
    if (cartItems.length === 0) {
      throw new BadRequestError('Cart items not found');
    }

    const productIds = cartItems.map(cartItem => cartItem.product_id)
    
    const products = await prisma.product.findMany({ where: { id: { in: productIds } }, include: {store:true} })

    const storeIds = products.map(product => product.store_id)
    const storeAddresses = await prisma.addressBook.findMany({ where: { reference: { in: storeIds } } });

    const categoryIds = products.map(product => product.category_id)

    const categories = await prisma.category.findMany({ where: { id: { in: categoryIds } } });

    const orderItemDetails = cart_ids.map((cartId: string) => {
      const cartItem = cartItems.find((cartItem: Cart) => cartItem.id === cartId);

      const { product_variant_id, quantity, product_id, product_variant_spec_id, store_id, amount, variant_img_url, size, color } = cartItem;
      const product = products.find((product: Product) => product.id === product_id);
      const { name, description,  category_id, store }  = product;
      const { name:category } = categories.find(category => category.id === category_id)
      const  { brand_name, img_url, logo, slug } = store
      const storeAddress = storeAddresses.find(storeAddress => storeAddress.reference === store_id)

      return {
        product_id,
        product_variant_id,
        product_variant_spec_id,
        store_id,
        amount: Number(amount) * quantity,
        variant_img_url,
        size,
        color,
        quantity: quantity,
        user_id: user.id,
        order_reference: orderReference,
        status: ORDER_STATUS.PENDING,
        meta: {
          product_details: {
            name: name,
            description,
            slug: product.slug,
            category,
            product_owner_id: product.user_id,
          },
          store_details: {
            store_id: store.id,
            user_id: store.user_id,
            store_name: brand_name,
            store_img_url: img_url,
            store_logo: logo,
            store_slug: slug,
            store_address: {
              state: storeAddress.state,
              city: storeAddress.city,
              street: storeAddress.street,
              phone_number: storeAddress.phone_number,
              alternative_phone_number: storeAddress.alternative_phone_number,
              contact_name: storeAddress.first_name + '' + storeAddress.last_name,
            }
          },
          buyer_details: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            img_url: user.img_url,
            email: user.email
          }
        }
    }
  })

    const delivery_address = await prisma.addressBook.findFirst({ where: { id: address_book_id, user_id: user.id } });
    if (!delivery_address) {
      throw new BadRequestError(`Delivery address not found`);
    }

    await prisma.order.createMany({ data: orderItemDetails });
    const newOrders = await prisma.order.findMany({ where: { order_reference: orderReference } });

    const deliveryInfo = newOrders.map((orderItem) => {
      const { first_name, last_name, state, city, street, user_id } = delivery_address;
      return {
        order_id: orderItem.id,
        user_id,
        state,
        city,
        street,
        order_reference: orderReference,
        receivers_name: `${first_name} ${last_name}`
      };
    });

  await prisma.deliveryInformation.createMany({ data: deliveryInfo });
  await prisma.cart.deleteMany({ where: { id: { in: cart_ids } } });

    return newOrders;

};

export const fetchOrderItemsRepo = async (filter: Partial<Order>): Promise<Order[]> => {
  const orders = await prisma.order.findMany({
    where: { ...filter },
    include: { delivery_information: true },
    orderBy: {
      created_at: 'desc'
    }
  });
  return orders;
};

export const findOrderItemRepo = async (filter: { id: number }): Promise<Order | null> => {
  const order = await prisma.order.findUnique({
    where: filter,
    include: {
      delivery_information: true
    }
  });
  return order;
};

export const updateOrderItemRepo = async (filters: { id: number }, data: Partial<Order>): Promise<Order> => {
  const order = await prisma.order.update({
    data: {
      ...data
    },
    where: filters
  });
  return order;
};

export const deleteOrderItemRepo = async (filters: { id: number }): Promise<Order> => {
  const order = await prisma.order.delete({
    where: filters
  });
  return order;
};
