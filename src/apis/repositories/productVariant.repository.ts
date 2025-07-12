// import { PrismaClient } from '@prisma/client';

import { PrismaClient } from '@prisma/client';
import { IStatus } from '@src/interfaces/generals';
import { FetchProductVariant, ProductVariant, ProductVariantSpec, ProductVariantWithSpecs } from '@src/interfaces/product';

const prisma = new PrismaClient();

export const createProductVariantRepo = async (productVariantDetails: ProductVariantWithSpecs): Promise<ProductVariant> => {
  const { status, color, img_urls, video_url, product_id, store_id, user_id } = productVariantDetails;
  return await prisma.$transaction(async (trx) => {
    const productVariant = await trx.productVariant.create({
      data: {
        status,
        color,
        img_urls,
        video_url,
        product_id,
        store_id,
        user_id
      }
    });
    return productVariant;
  });
};

export const createProductVariantBulkRepo = async (productVariantDetails: ProductVariantWithSpecs): Promise<ProductVariant> => {
  const { id, status, color, img_urls, video_url, product_id, store_id, user_id } = productVariantDetails;
  return await prisma.$transaction(async (trx) => {
    const productVariant = await trx.productVariant.create({
      data: {
        status,
        color,
        img_urls,
        video_url,
        product_id,
        store_id,
        user_id,
        id
      }
    });
    return productVariant;
  });
};

export const createProductVariantSpecRepo = async (productVariantSpec: ProductVariantSpec): Promise<ProductVariantSpec> => {
  const variantSpec = await prisma.productVariantSpec.create({
    data: productVariantSpec
  });

  return variantSpec;
};

export const createProductVariantSpecBulkRepo = async (productVariantSpec: ProductVariantSpec): Promise<ProductVariantSpec> => {
  console.log(productVariantSpec)
  const variantSpec = await prisma.productVariantSpec.create({
    data: productVariantSpec
  });

  return variantSpec;
};

export const findProductVariantRepo = async (filter: { id: string }): Promise<ProductVariant | null> => {
  const productVariant = await prisma.productVariant.findUnique({
    where: filter,
    include: {
      product_variant_specs: {
        select: {
          size: true,
          amount: true,
          quantity: true
        }
      }
    }
  });
  return productVariant;
};

export const findProductVariantSpecRepo = async (filter: Partial<ProductVariantSpec>): Promise<ProductVariantSpec | null> => {
  const productVariantSpec = await prisma.productVariantSpec.findFirst({
    where: { ...filter }
  });
  return productVariantSpec;
};

export const fetchProductVariantsRepo = async (filter: Partial<FetchProductVariant>): Promise<ProductVariant[]> => {
  const productVariant = await prisma.productVariant.findMany({
    where: { ...filter },
    include: {
      product_variant_specs: {
        select: {
          size: true,
          amount: true,
          quantity: true
        }
      }
    }
  });
  return productVariant;
};

export const fetchProductVariantSpecRepo = async (filter: Partial<ProductVariantSpec>): Promise<ProductVariantSpec[]> => {
  const productVariantSpec = await prisma.productVariantSpec.findMany({
    where: { ...filter }
  });
  return productVariantSpec;
};

export const updateProductVariantRepo = async (
  filters: { id: string },
  data: Partial<ProductVariant>
): Promise<ProductVariant> => {
  const productVariant = await prisma.productVariant.update({
    data: {
      ...data
    },
    where: filters,
    include: {
      product_variant_specs: {
        select: {
          size: true,
          amount: true,
          quantity: true
        }
      }
    }
  });
  return productVariant;
};

export const updateProductVariantSpecRepo = async (
  filters: { id: string },
  data: Partial<ProductVariantSpec | any>
): Promise<ProductVariantSpec> => {
  const productVariantSpec = await prisma.productVariantSpec.update({
    data: {
      ...data
    },
    where: filters
  });
  return productVariantSpec;
};

export const activateOrDeactivateProductVariantRepo = async (
  filters: { id: string },
  status: IStatus
): Promise<ProductVariant> => {
  const productVariant = await prisma.productVariant.update({
    data: {
      status
    },
    where: filters,
    include: {
      product_variant_specs: {
        select: {
          size: true,
          amount: true,
          quantity: true
        }
      }
    }
  });

  return productVariant;
};

export const deleteProductVariantRepo = async (filters: { id: string }): Promise<ProductVariant> => {
  const deletedProductVariant = await prisma.productVariant.delete({
    where: filters,
    include: {
      product_variant_specs: {
        select: {
          size: true,
          amount: true,
          quantity: true
        }
      }
    }
  });
  return deletedProductVariant;
};

export const deleteProductVariantSpecRepo = async (filters: { id: string }): Promise<ProductVariantSpec> => {
  const deletedProductVariant = await prisma.productVariantSpec.delete({
    where: filters
  });
  return deletedProductVariant;
};
