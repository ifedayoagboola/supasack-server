import { PrismaClient } from '@prisma/client';
import { globalFilter } from '@src/constants';
import { IStatus } from '@src/interfaces/generals';
import { Advert, Product } from '@src/interfaces/product';
import { subDays, format } from 'date-fns';

const prisma = new PrismaClient();

// prisma.$use(async (params, next) => {
//   // if (params.action === 'create') {
//   // }
//   // return next(params);
// });

const randomIntFromInterval = (min: number = 0, max: number = 20)  => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const createProductRepo = async (productDetails: Partial<Product>): Promise<Product> => {
  const { name, description, slug, category_id, user_id, status, store_id, estimated_delivery_duration } = productDetails;
  const product = await prisma.product.create({
    data: {
      name,
      description,
      slug,
      status,
      category_id,
      user_id,
      store_id,
      estimated_delivery_duration
    }
  });
  return product;
};

// export const createAdvert = async (advert: Partial<Advert>): Promise<Advert> => {
//   const {store_name, product_name, store_link, amount}
//   return 
// }  

export const createProductSpecialRepo = async (productDetails: Partial<Product>): Promise<Product> => {
  const { id, name, description, slug, category_id, user_id, status, store_id, estimated_delivery_duration } = productDetails;
  const product = await prisma.product.create({
    data: {
      id,
      name,
      description,
      slug,
      status,
      category_id,
      user_id,
      store_id,
      estimated_delivery_duration
    }
  });
  return product;
};

export const createBulkProductRepo = async (productDetails: Partial<Product[]>): Promise<any> => {
  const product = await prisma.product.createMany({
    data: productDetails
  });
  return product;
};

export const fetchProductDetailRepo = async (filter: Partial<Product>): Promise<Product | undefined> => {
  const product = await prisma.product.findFirst({
    where: { ...filter, ...globalFilter }
  });
  return product;
};

export const findProductRepo = async (filter: Partial<Product>): Promise<Product | undefined> => {
  const product = await prisma.product.findFirst({
    include: {
      store: true,
      product_variants: true
    },
    where: { ...filter, ...globalFilter }
  });
  return product;
};

export const activateOrDeactivateProductRepo = async (filter: { id: string }, status: IStatus): Promise<Product> => {
  return await prisma.$transaction(async (trx) => {
    await trx.productVariant.updateMany({ data: { status }, where: { product_id: filter.id } });

    const product = await trx.product.update({
      data: {
        status
      },
      where: filter
    });

    return product;
  });
};

export const findProductWithVariantsRepo = async (filter: { id: string }): Promise<Product | null> => {
  const product = await prisma.product.findUnique({
    include: {
      product_variants: true,
      store: true
    },
    where: filter
  });
  return product;
};

export const fetchProductsWithVariantsRepo = async (filter: Partial<Product>): Promise<Product[]> => {
  const product = await prisma.product.findMany({
    include: {
      product_variants: true,
      store: true
    },
    where: { ...filter, ...globalFilter }
  });
  return product;
};

export const fetchProductsRepo = async (filters?: Partial<Product | any>): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    where: { ...filters, ...globalFilter },
    include: {
      store: {
        select: {
          brand_name: true,
          slug: true,
          img_url: true
        }
      },
      product_variants: {
        include: {
          product_variant_specs: true
        },
        where: {
          status: filters.status
        }
      }
    },
    orderBy: {
      views: 'desc'
    }
  });
  return products;
};

export const searchProductByName = async (query: string): Promise<Product[]> => {
  let products: Product[] = []
  if (!query) {
    products = await prisma.product.findMany({take: 15, orderBy: {
      created_at: 'desc'
    } });
    return products;
  } else {
    products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      }
    });
    return products;
  }
};

export const fetchProductsAnalysis = async (filter?: Partial<Product | any>): Promise<any[]> => {
  const products = await prisma.product.findMany({
    where: { ...filter, ...globalFilter }
  });
    let date = new Date()
    const daysAgo = new Date(date.getTime());

  return [
    {
      date: subDays(new Date(), 7),
      view_count: products.length + 7,
      formatted_date: format(subDays(new Date(), 7), 'ccc')
    },
    {
      date: subDays(new Date(), 6),
      view_count: products.length + 6,
      formatted_date: format(subDays(new Date(), 6), 'ccc')
    },
    {
      date: subDays(new Date(), 5),
      view_count: products.length + 5,
      formatted_date: format(subDays(new Date(), 5), 'ccc')
    },
    {
      date: subDays(new Date(), 4),
      view_count: products.length + 4,
      formatted_date: format(subDays(new Date(), 4), 'ccc')
    },
    {
      date: subDays(new Date(), 3),
      view_count: products.length + 3,
      formatted_date: format(subDays(new Date(), 3), 'ccc')
    },
    {
      date: subDays(new Date(), 2),
      view_count: products.length + 2,
      formatted_date: format(subDays(new Date(), 2), 'ccc')
    },
    {
      date: subDays(new Date(), 1),
      view_count: products.length + 1,
      formatted_date: format(subDays(new Date(), 1), 'ccc')
    }
  ];
};

export const updateProductRepo = async (filter: { id: string }, data: Partial<Product>): Promise<Product> => {
  const product = await prisma.product.update({
    data: {
      ...data
    },
    where: filter
  });
  return product;
};

export const deleteProductRepo = async (filter: { id: string }): Promise<Product> => {
  const deletedProduct = await prisma.product.delete({
    where: { ...filter, ...globalFilter }
  });
  return deletedProduct;
};

export const softDeleteProductRepo = async (filter: Partial<Product>): Promise<any> => {
  const deletedProduct = await prisma.product.updateMany({
    data: {isDeleted: true},
    where: { ...filter, ...globalFilter }
  });
  return deletedProduct;
};

export const increamentProdutViewsRepo = async (filter: { id: string }) => {
  const updatedProductViews = await prisma.product.update({
    data: {
      views: { increment: 1 }
    },
    where: filter
  });
  return updatedProductViews;
};