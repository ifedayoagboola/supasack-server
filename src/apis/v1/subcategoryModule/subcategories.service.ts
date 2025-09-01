import { findCategoryRepo } from '@src/apis/repositories/categories.repository';
import {
  createSubcategoryRepo,
  deleteSubCategoryRepo,
  fetchAllSubCategoriesRepo,
  findSubCategoryRepo,
  updateSubCategoryRepo
} from '@src/apis/repositories/subcategories.repository';
import { BadRequestError } from '@src/common/errors';
import { Subcategory } from '@src/interfaces/subcategory';

export const createSubcategorySrv = async (data: Partial<Subcategory>): Promise<Subcategory> => {
  const subCategory = await findSubCategoryRepo({ name: data.name });

  const category = await findCategoryRepo({ name: data.category_name });

  if (subCategory) {
    throw new BadRequestError(`Subcategory ${data.name} already exist`);
  }

  if (!category) throw new BadRequestError(`Category does not exist`);

  return await createSubcategoryRepo({ ...data, category_id: category.id });
};

export const getSubCategorySrv = async (data: Partial<Subcategory>): Promise<Subcategory> => {
  const subCategory = await findSubCategoryRepo({ id: data.id });
  if (!subCategory) {
    throw new BadRequestError(`Subcategory does not already exist`);
  }
  return subCategory;
};

export const getAllSubCategoriesSrv = async (): Promise<Subcategory[]> => {
  return await fetchAllSubCategoriesRepo({});
};

export const updateSubCategorySrv = async (filter: Partial<Subcategory>, data: Partial<Subcategory>): Promise<Subcategory> => {
  const subcategory = await findSubCategoryRepo({ id: filter.id });

  const isCategory = await findCategoryRepo({ name: data.category_name });

  if (!subcategory) {
    throw new BadRequestError('SubCategory not found');
  }

  if (!isCategory) throw new BadRequestError(`Category does not exist`);

  return await updateSubCategoryRepo({ id: filter.id }, { ...data, category_id: isCategory.id });
};

export const deleteSubCategorySrv = async (filter: Partial<Subcategory>) => {
  const subcategory = await findSubCategoryRepo({ id: filter.id });

  if (!subcategory) {
    throw new BadRequestError('Record not found');
  }
  await deleteSubCategoryRepo({ id: filter.id });
};
