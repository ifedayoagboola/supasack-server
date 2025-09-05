import authenticate from '@src/apis/middleware/authenticate.middleware';
import { createCategorySchema, getCategorySchema, updateCategorySchema } from '@src/apis/schemas/category.schema';
import { Router } from 'express';
import CategoryController from './categories.controller';
import { requireAdmin } from '@src/apis/middleware/authorize.middleware';

const categoryRouter = Router();

categoryRouter.get('/', CategoryController.getAllCategories());
categoryRouter.put('/:id', authenticate(), requireAdmin, updateCategorySchema, CategoryController.updateCategory());
categoryRouter.get('/:id', authenticate(), requireAdmin, getCategorySchema, CategoryController.getCategory());
categoryRouter.delete('/:id', authenticate(), requireAdmin, CategoryController.deleteCategory());
categoryRouter.post('/', authenticate(), requireAdmin, createCategorySchema, CategoryController.createCategory());

export default categoryRouter;
