import authenticate from '@src/apis/middleware/authenticate.middleware';
import { createCategorySchema, updateCategorySchema } from '@src/apis/schemas/category.schema';
import { Router } from 'express';
import CategoryController from './categories.controller';

const categoryRouter = Router();

categoryRouter.get('/', CategoryController.getAllCategories());
categoryRouter.post('/update', authenticate(), updateCategorySchema, CategoryController.updateCategory());
categoryRouter.post('/create', createCategorySchema, CategoryController.createCategory());

export default categoryRouter;
