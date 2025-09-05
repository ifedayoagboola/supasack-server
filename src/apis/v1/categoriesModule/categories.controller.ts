import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createCategorySrv, deleteCategorySrv, getAllCategoriesSrv, getCategorySrv, updateCategorySrv } from './categories.service';

const CategoryController = {
  createCategory: (): RequestHandler => async (req, res, next) => {
    try {
      const { name, code, img_url } = req.body;
      const newCategory = await createCategorySrv({ name, code, img_url });
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
    getCategory: (): RequestHandler => async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const category = await getCategorySrv({ id });
      return respond(res, category, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  updateCategory: (): RequestHandler => async (req, res, next) => {
    try {
      const id = req.params.id;
      const categoryDetails = req.body;
      const updatedCategory = await updateCategorySrv({ id }, categoryDetails);
      return respond(res, updatedCategory, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  deleteCategory: (): RequestHandler => async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteCategorySrv({ id });
      return respond(res, 'Category deleted successfully', StatusCodes.OK);
    } catch (err) {
      next(err);
    }
  }
};

export default CategoryController;
