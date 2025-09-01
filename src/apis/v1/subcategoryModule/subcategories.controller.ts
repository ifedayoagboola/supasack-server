import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createSubcategorySrv, deleteSubCategorySrv, getAllSubCategoriesSrv, getSubCategorySrv, updateSubCategorySrv } from './subcategories.service';

const SubCategoryController = {
  createSubCategory: (): RequestHandler => async (req, res, next) => {
    try {
      const { name, category_name, description, img_url } = req.body;

      const newSubCategory = await createSubcategorySrv({ name, category_name, description, img_url });
      respond(res, newSubCategory, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  getAllSubCategories: (): RequestHandler => async (req, res, next) => {
    try {
      const subCategories = await getAllSubCategoriesSrv();
      respond(res, subCategories, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  getSubCategory: (): RequestHandler => async (req, res, next) => {
    try {
      const id = req.params.id;
      const subcategory = await getSubCategorySrv({ id });
      return respond(res, subcategory, StatusCodes.OK);
    } catch (err) {
      next(err);
    }
  },
  updateSubCategory: (): RequestHandler => async (req, res, next) => {
    try {
      const id = req.params.id;
      const subcategoryDetails = req.body;
      const updatedSubCategory = await updateSubCategorySrv({ id }, subcategoryDetails);
      return respond(res, updatedSubCategory, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  deleteSubCategory: (): RequestHandler => async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteSubCategorySrv({ id });
      return respond(res, 'Subcategory deleted successfully', StatusCodes.OK);
    } catch (err) {
      next(err);
    }
  }
};

export default SubCategoryController;
