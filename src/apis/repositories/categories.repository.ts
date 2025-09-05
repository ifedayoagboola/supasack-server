import { PrismaClient } from '@prisma/client';
import { Category } from '@src/interfaces/category';

const prisma = new PrismaClient();

export const createCategoryRepo = async (data: Partial<Category>): Promise<Category> => {
  const { name, code, img_url } = data;
  const category = await prisma.category.create({
    data: {
      name,
      code
    }
  });
  return category;
};

export const findCategoryRepo = async (filters: { id: string } | { name: string }): Promise<Category | null> => {
  const category = await prisma.category.findUnique({
    where: filters
  });
  return category;
};

export const fetchAllCategoriesRepo = async (filters: Partial<Category>): Promise<Partial<Category[]>> => {
  const category = await prisma.category.findMany({
    where: { ...filters }
  });

  return category;
};

export const updateCategoryRepo = async (filters: { id: string } | { name: string }, data: Partial<Category>): Promise<Category> => {
  const product = await prisma.category.update({
    data: {
      ...data
    },
    where: filters
  });
  return product;
};

export const deleteCategoryRepo = async (filters: { id: string }) => {
   await prisma.category.delete({
    where: filters
  });

  await prisma.product.updateMany({
    data: { isDeleted: true },
    where: { category_id: filters.id }
  });
  
};
