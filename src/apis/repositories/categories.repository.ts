import { PrismaClient } from '@prisma/client';
import { Category } from '@src/interfaces/category';

const prisma = new PrismaClient();

export const createCategoryRepo = async (data: Partial<Category>): Promise<Category> => {
  const category = await prisma.category.create({
    data: {
      category: data.category,
      img_url: data.img_url
    }
  });
  return category;
};

export const findCategoryRepo = async (filters: { id: string } | { category: string }): Promise<Category | null> => {
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

export const updateCategoryRepo = async (filters: { id: string } | { category: string }, data: Partial<Category>): Promise<Category> => {
  const product = await prisma.category.update({
    data: {
      ...data
    },
    where: filters
  });
  return product;
};
