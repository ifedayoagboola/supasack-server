import { findProductRepo } from '@src/apis/repositories/product.repository';
import { STATUS } from '@src/constants/store.constant';
import { BadRequestError } from '@src/common/errors';
import { IStatus } from '@src/interfaces/generals';
import { ProductVariant, ProductVariantSpec } from '@src/interfaces/product';

import {
  activateOrDeactivateProductVariantRepo,
  createProductVariantBulkRepo,
  createProductVariantRepo,
  createProductVariantSpecBulkRepo,
  createProductVariantSpecRepo,
  deleteProductVariantRepo,
  deleteProductVariantSpecRepo,
  fetchProductVariantSpecRepo,
  fetchProductVariantsRepo,
  findProductVariantRepo,
  findProductVariantSpecRepo,
  updateProductVariantRepo,
  updateProductVariantSpecRepo
} from '../../../repositories/productVariant.repository';

export const createProductVariantSrv = async (productVariant: ProductVariant): Promise<ProductVariant> => {
  const foundProduct = await findProductRepo({ id: productVariant.product_id });
  if (!foundProduct) {
    throw new BadRequestError('Invalid product id provided');
  }
  productVariant.store_id = foundProduct.store_id;
  const createProductVariant = await createProductVariantRepo(productVariant);
  return createProductVariant;
};

export const createProductVariantBulkSrv = async (productVariant: ProductVariant): Promise<ProductVariant> => {
  const foundProduct = await findProductRepo({ id: productVariant.product_id });
  if (!foundProduct) {
    throw new BadRequestError('Invalid product id provided');
  }
  const createProductVariant = await createProductVariantBulkRepo(productVariant);
  return createProductVariant;
};

export const createProductVariantSpecSrv = async (productVariantSpec: ProductVariantSpec): Promise<ProductVariantSpec> => {
  const { size, product_variant_id } = productVariantSpec;
  const foundProductVariant = await findProductVariantRepo({ id: product_variant_id });
  if (!foundProductVariant) {
    throw new BadRequestError('Invalid product variant id provided');
  }

  const existingSpec = await findProductVariantSpecRepo({ product_variant_id, size: size ? size : null });
  if (existingSpec && existingSpec.size) {
    throw new BadRequestError('A specification of the same size already exist for this product variant');
  }
  const createProductVariantSpec = await createProductVariantSpecRepo(productVariantSpec);
  return createProductVariantSpec;
};

export const createProductVariantSpecBulkSrv = async (productVariantSpec: ProductVariantSpec): Promise<ProductVariantSpec> => {
  const { size, product_variant_id } = productVariantSpec;
  const foundProductVariant = await findProductVariantRepo({ id: product_variant_id });
  if (!foundProductVariant) {
    throw new BadRequestError('Invalid product variant id provided');
  }

  const existingSpec = await findProductVariantSpecRepo({ product_variant_id, size: size ? size : null });
  if (existingSpec && existingSpec.size) {
    throw new BadRequestError('A specification of the same size already exist for this product variant');
  }
  const createProductVariantSpec = await createProductVariantSpecBulkRepo(productVariantSpec);
  return createProductVariantSpec;
};

export const findProductVariantSrv = async (data: Partial<ProductVariant>): Promise<ProductVariant | undefined> => {
  const productVariant = await findProductVariantRepo({ id: data.id });
  if (!productVariant) {
    throw new BadRequestError('ProductVariant not found');
  }
  return productVariant;
};

export const fetchProductVariantsSrv = async (filters?: Partial<ProductVariant>): Promise<ProductVariant[]> => {
  const productVariants = await fetchProductVariantsRepo(filters);
  return productVariants;
};

export const fetchProductVariantSpecSrv = async (filters?: Partial<ProductVariantSpec>): Promise<ProductVariantSpec[]> => {
  const productVariantSpec = await fetchProductVariantSpecRepo(filters);
  return productVariantSpec;
};

export const updateProductVariantSrv = async (filter: Partial<ProductVariant>, data: Partial<ProductVariant>): Promise<ProductVariant> => {
  const productVariant = await findProductVariantRepo({ id: filter.id });
  if (!productVariant) {
    throw new BadRequestError('Product variant not found');
  }
  const updatedProductVariant = await updateProductVariantRepo({ id: filter.id }, data);
  return updatedProductVariant;
};

export const updateProductVariantSpecSrv = async (
  filter: Partial<ProductVariantSpec>,
  data: Partial<ProductVariantSpec>
): Promise<ProductVariantSpec> => {
  const productVariantSpec = await findProductVariantSpecRepo({ ...filter });
  if (!productVariantSpec) {
    throw new BadRequestError('Product variant specifications not found');
  }

  const existingSpec = await fetchProductVariantSpecRepo({ product_variant_id: productVariantSpec.product_variant_id });

  if (existingSpec.map((s) => s.size).includes(data?.size) && productVariantSpec.id !== filter.id) {
    throw new BadRequestError('A specification with the same size already exists');
  }

  const updatedProductVariantSpec = await updateProductVariantSpecRepo({ id: filter.id }, data);
  return updatedProductVariantSpec;
};

export const activateOrDeactivateProductVariantSrv = async (filter: Partial<ProductVariant>, status: IStatus): Promise<ProductVariant> => {
  const productVariant = await findProductVariantRepo({ id: filter.id });
  if (!productVariant) {
    throw new BadRequestError('Record not found');
  }
  const foundProduct = await findProductRepo({ id: productVariant.product_id });
  if (foundProduct.status === STATUS.INACTIVE) {
    throw new BadRequestError('This product is currently deactivate.');
  }
  const updatedStore = await activateOrDeactivateProductVariantRepo({ id: filter.id }, status);
  return updatedStore;
};

export const deleteProductVariantSrv = async (filter: Partial<ProductVariant>) => {
  const productVariant = await findProductVariantRepo({ id: filter.id });
  if (!productVariant) {
    throw new BadRequestError('ProductVariant not found');
  }
  const deletedProductVariant = await deleteProductVariantRepo({ id: filter.id });
  return deletedProductVariant;
};

export const deleteProductVariantSpecSrv = async (filter: Partial<ProductVariantSpec>) => {
  const productVariantSpec = await findProductVariantSpecRepo({ ...filter });
  if (!productVariantSpec) {
    throw new BadRequestError('Product variant specifications not found');
  }
  const deletedProductVariantSpec = await deleteProductVariantSpecRepo({ id: filter.id });
  return deletedProductVariantSpec;
};
