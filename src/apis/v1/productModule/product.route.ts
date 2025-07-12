import authenticate from '@src/apis/middleware/authenticate.middleware';
import {
  activateOrDeactivateProductSchema,
  activateOrDeactivateProductVariantSchema,
  createProductSchema,
  createProductVariantSchema,
  createProductVariantSpecSchema,
  deleteProductVariantSchema,
  deleteProductVariantSpecSchema,
  fetchProductSchema,
  fetchProductVariantSchema,
  fetchProductVariantSpecSchema,
  updateProductSchema,
  updateProductVariantSchema,
  updateProductVariantSpecSchema
} from '@src/apis/schemas/product.schema';
import { STATUS } from '@src/constants/store.constant';
import { IStatus } from '@src/interfaces/generals';
import { Router } from 'express';
import ProductController from './product.controller';
import ProductVariantController from './productVariant.ts/productVartiant.controller';

const productRouter = Router();

productRouter.post('/create', authenticate(), createProductSchema, ProductController.create());
productRouter.post('/createBulk', ProductController.createBulk());
productRouter.get('/seller', authenticate(), fetchProductSchema, ProductController.fetchProducts());
productRouter.post('/delivery_fee', ProductController.fetchProductDeliveryFee());

productRouter.get('/search', ProductController.search());

productRouter.post( 
  '/activate',
  authenticate(),
  activateOrDeactivateProductSchema,
  ProductController.activateOrDeactivateProduct(STATUS['ACTIVE'] as IStatus)
);

productRouter.post(
  '/deactivate',
  authenticate(),
  activateOrDeactivateProductSchema,
  ProductController.activateOrDeactivateProduct(STATUS['INACTIVE'] as IStatus)
);

productRouter.post('/update', authenticate(), updateProductSchema, ProductController.updateProductDetails());
productRouter.delete('/delete', authenticate(), ProductController.deleteProduct());
productRouter.get('/', fetchProductSchema, ProductController.fetchProducts());
productRouter.get('/all/admin', fetchProductSchema, ProductController.fetchAllProductsAdmin());

productRouter.post('/variant/create', authenticate(), createProductVariantSchema, ProductVariantController.create());
productRouter.post('/variant/createBulk', ProductVariantController.createBulk());
productRouter.get('/variant', authenticate(), fetchProductVariantSchema, ProductVariantController.fetchProductVariants());
productRouter.post('/variant/update', authenticate(), updateProductVariantSchema, ProductVariantController.updateProductVariantDetails());
productRouter.delete('/variant/delete', authenticate(), deleteProductVariantSchema, ProductVariantController.deleteProductVariant());
productRouter.post(
  '/variant/activate',
  authenticate(),
  activateOrDeactivateProductVariantSchema,
  ProductVariantController.activateOrDeactivateProductVariant(STATUS['ACTIVE'] as IStatus)
);

productRouter.post(
  '/variant/deactivate',
  authenticate(),
  activateOrDeactivateProductVariantSchema,
  ProductVariantController.activateOrDeactivateProductVariant(STATUS['INACTIVE'] as IStatus)
);

//product variant spec

productRouter.post('/variant/spec/create', authenticate(), createProductVariantSpecSchema, ProductVariantController.createProductVariantSpec());
productRouter.post('/variant/spec/createBulk', ProductVariantController.xcreateProductVariantSpecBulk());
productRouter.get('/variant/spec', authenticate(), fetchProductVariantSpecSchema, ProductVariantController.fetchProductVariantSpec());
productRouter.post('/variant/spec/update', authenticate(), updateProductVariantSpecSchema, ProductVariantController.updateProductVariantSpec());
productRouter.delete('/variant/spec/delete', authenticate(), deleteProductVariantSpecSchema, ProductVariantController.deleteProductVariantSpec());

export default productRouter;
