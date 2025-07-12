import { BadRequestError } from '@src/common/errors';
import { Category } from '@src/interfaces/category';
import { createCategoryRepo, fetchAllCategoriesRepo, findCategoryRepo, updateCategoryRepo } from '../../repositories/categories.repository';

export const createCategorySrv = async (data: Partial<Category>): Promise<Category> => {
  data = {
    ...data,
    category: data.category.toLocaleUpperCase()
  };

  const existingCategory = await findCategoryRepo({ category: data.category });
  if (existingCategory) {
    throw new BadRequestError(`Category ${data.category} already exists} already exist`);
  }
  const category = await createCategoryRepo(data);
  return category;
};

export const getAllCategoriesSrv = async (): Promise<Category[]> => {
  const categories = await fetchAllCategoriesRepo({});
  return categories;
};

export const updateCategorySrv = async (filter: Partial<Category>, data: Partial<Category>): Promise<Category> => {
  const category = await findCategoryRepo({ id: filter.id });
  if (!category) {
    throw new BadRequestError('Category not found');
  }

  const updatedCategory = await updateCategoryRepo({ id: filter.id }, data);
  return updatedCategory;
};
