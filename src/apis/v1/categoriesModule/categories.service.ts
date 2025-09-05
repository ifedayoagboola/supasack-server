import { BadRequestError } from '@src/common/errors';
import { Category } from '@src/interfaces/category';
import {
  createCategoryRepo,
  deleteCategoryRepo,
  fetchAllCategoriesRepo,
  findCategoryRepo,
  updateCategoryRepo
} from '../../repositories/categories.repository';

export const createCategorySrv = async (data: Partial<Category>): Promise<Category> => {
  data = {
    ...data,
    name: data.name.toLocaleUpperCase()
  };

  const existingCategory = await findCategoryRepo({ name: data.name });
  if (existingCategory) {
    throw new BadRequestError(`Category ${data.name} already exist`);
  }
  console.log(data, '2');
  const category = await createCategoryRepo(data);
  return category;
};

export const getAllCategoriesSrv = async (): Promise<Category[]> => {
  const categories = await fetchAllCategoriesRepo({});
  return categories;
};

export const getCategorySrv = async (filter: Partial<Category>,): Promise<Category> => {
  const categories = await findCategoryRepo({ id: filter.id });
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

export const deleteCategorySrv = async (filter: Partial<Category>) => {
  const category = await findCategoryRepo({ id: filter.id });

  if (!category) {
    throw new BadRequestError('Record not found');
  }
  await deleteCategoryRepo({ id: filter.id });
};
