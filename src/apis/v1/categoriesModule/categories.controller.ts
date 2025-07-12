import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createCategorySrv, getAllCategoriesSrv, updateCategorySrv } from './categories.service';

const CategoryController = {
  createCategory: (): RequestHandler => async (req, res, next) => {
    try {
      const { category, img_url } = req.body;
      const newCategory = await createCategorySrv({ category, img_url });
      respond(res, newCategory, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  getAllCategories: (): RequestHandler => async (req, res, next) => {
    try {
      const getAllCategories = await getAllCategoriesSrv();
      respond(res, getAllCategories, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  updateCategory: (): RequestHandler => async (req, res, next) => {
    try {
      const { category_id } = req.query as Record<string, string>;
      const categoryDetails = req.body;
      const updatedCategory = await updateCategorySrv({ id: category_id }, categoryDetails);
      return respond(res, updatedCategory, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default CategoryController;
