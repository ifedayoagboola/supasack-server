import { BadRequestError } from '@src/common/errors';
import { Cart } from '@src/interfaces/cart';
import { JsonValue } from '@src/interfaces/generals';
import { fetchProductDetailRepo, fetchProductsRepo } from '../../repositories/product.repository';
import { findProductVariantRepo, findProductVariantSpecRepo } from '../../repositories/productVariant.repository';
import { createCartItemRepo, deleteCartItemRepo, fetchCartItemsRepo, findCartItemRepo, updateCartItemRepo } from '../../repositories/cart.repository';
import { logger } from '@src/utilities';

export const addCartItemSrv = async (cartItemDetail: any): Promise<Cart> => {
  const { product_variant_spec_id, product_id, product_variant_id, quantity } = cartItemDetail;
  const product = await fetchProductDetailRepo({ id: product_id });
  if (!product) {
    throw new BadRequestError('Product not found');
  }

  const productVariant = await findProductVariantRepo({ id: product_variant_id });
  if (!productVariant) {
    throw new BadRequestError('Product variant does not exist');
  }
  const productVariantSpec = await findProductVariantSpecRepo({ id: product_variant_spec_id });

  if (!productVariantSpec) {
    throw new BadRequestError('Product variant spec does not exist');
  }
  if (quantity > productVariantSpec?.quantity) {
    throw new BadRequestError(`${productVariantSpec?.quantity} left in stock`);
  }
  const { amount } = productVariantSpec;
  const size = productVariantSpec?.size;

  const existingCartItem = await findCartItemRepo({ product_variant_spec_id })
  if (existingCartItem) {
    const totalQuantity = existingCartItem.quantity + quantity
    if (totalQuantity > productVariantSpec?.quantity) {
      logger.error(`CART QUANTITY ERROR ===> total qauntity ${totalQuantity} is greater than the avaialble quanity ${productVariantSpec?.quantity} for product_id ${product_id} and product_variant_spec ${product_variant_spec_id}`);
      return existingCartItem;
    }
    const updateCartItem = updateCartItemRepo({ id: existingCartItem.id }, { quantity: totalQuantity });
    return updateCartItem;
  }
  const meta: JsonValue = {
    ...product,
    productVariant,
    productVariantSpec
  };
  
  cartItemDetail = {
    ...cartItemDetail,
    store_id: product.store_id,
    variant_img_url: productVariant?.img_urls[0],
    amount,
    size,
    meta
  };
  const cartItem = await createCartItemRepo(cartItemDetail);
  delete cartItem.meta;
  return cartItem;
};

export const fetchCartItemsSrv = async (data: Partial<Cart>): Promise<Cart[]> => {
  let cartItems = await fetchCartItemsRepo(data);
  const cartIds = cartItems.map((cartItem) => cartItem.product_id);
  let productDetails = await fetchProductsRepo({ id: { in: cartIds } });
  cartItems = cartItems.map((item) => {
    delete item.meta;
    const product = productDetails.find((product) => product.id === item.product_id);
    const { name, description, slug } = product;

    return {
      ...item,
      product_details: {
        name,
        description,
        slug
      }
    };
  });
  return cartItems;
};

export const updateCartItemSrv = async (filter: Partial<Cart>, data: Partial<Cart>): Promise<Cart> => {
  const cartItem = await findCartItemRepo({ ...filter });
  if (!cartItem) {
    throw new BadRequestError('Record not found');
  }

  const productVariantSpec = await findProductVariantSpecRepo({id: cartItem.product_variant_spec_id})

  if (data.quantity && data.quantity > productVariantSpec.quantity) {
    throw new BadRequestError('maximum quanity reached for this variant')
  }

  const updatedCart = await updateCartItemRepo({ id: filter.id }, data);
  delete updatedCart.meta;
  return updatedCart;
};

export const deleteCartItemSrv = async (filter: Partial<Cart>) => {
  const cartItem = await findCartItemRepo({ ...filter });
  if (!cartItem) {
    throw new BadRequestError('Cart item not found');
  }
  const deletedCart = await deleteCartItemRepo({ id: filter.id });
  return deletedCart;
};
