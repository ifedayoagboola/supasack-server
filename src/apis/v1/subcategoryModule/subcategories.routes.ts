import authenticate from '@src/apis/middleware/authenticate.middleware';
import { Router } from 'express';

import { requireAdmin } from '@src/apis/middleware/authorize.middleware';
import SubCategoryController from './subcategories.controller';
import { createSubCategorySchema, updateSubCategorySchema } from '@src/apis/schemas/subcategory.schema';

const subcategoryRouter = Router();

subcategoryRouter.get('/', SubCategoryController.getAllSubCategories());
subcategoryRouter.put('/:id', authenticate(), requireAdmin, updateSubCategorySchema, SubCategoryController.updateSubCategory());
subcategoryRouter.get('/:id', authenticate(), requireAdmin, SubCategoryController.getSubCategory());
subcategoryRouter.delete('/:id', authenticate(), requireAdmin, SubCategoryController.deleteSubCategory());
subcategoryRouter.post('/', authenticate(), requireAdmin, createSubCategorySchema, SubCategoryController.createSubCategory());

export default subcategoryRouter;
