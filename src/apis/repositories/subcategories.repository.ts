import { PrismaClient } from '.prisma/client';
import { Subcategory } from '@src/interfaces/subcategory';

const prisma = new PrismaClient();

export const createSubcategoryRepo = async (data: Partial<Subcategory>) => {
  const { name, img_url, category_id, description } = data;

  return await prisma.subCategory.create({
    data: {
      name,
      img_url,
      category_id,
      description
    }
  });
};

export const findSubCategoryRepo = async (filters: { id: string } | { name: string }): Promise<Subcategory | null> => {
  return await prisma.subCategory.findUnique({
    where: { ...filters },
    select: {
      id: true,
      name: true,
      img_url: true,
      description: true,
      category: {
        select: {
          name: true,
          code: true
        }
      }
    }
  });
};

export const fetchAllSubCategoriesRepo = async (filters?: Omit<Partial<Subcategory>, 'category'>): Promise<Partial<Subcategory[]>> => {
  return await prisma.subCategory.findMany({
    where: { ...filters },
    select: {
      id: true,
      name: true,
      img_url: true,
      description: true,
      category: {
        select: {
          name: true,
          code: true
        }
      }
    }
  });
};

export const updateSubCategoryRepo = async (
  filters:
    | {
        id: string;
      }
    | { name: string },
  data: Partial<Subcategory>
): Promise<Subcategory> => {
  const { name, img_url, category_id, description } = data;

  return await prisma.subCategory.update({
    data: {
      name,
      img_url,
      description,
      category_id
    },
    where: filters
  });
};

export const deleteSubCategoryRepo = async (filters: { id: string }) => {
  await prisma.subCategory.delete({
    where: filters
  });
};
