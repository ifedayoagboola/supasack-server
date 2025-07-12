import { fetchProductVariantSpecRepo, fetchProductVariantsRepo } from '@src/apis/repositories/productVariant.repository';
import { IStatus } from '@src/interfaces/generals';
import { ProductVariantSpec } from '@src/interfaces/product';
import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  activateOrDeactivateProductVariantSrv,
  createProductVariantBulkSrv,
  createProductVariantSpecBulkSrv,
  createProductVariantSpecSrv,
  createProductVariantSrv,
  deleteProductVariantSpecSrv,
  deleteProductVariantSrv,
  fetchProductVariantsSrv,
  updateProductVariantSpecSrv,
  updateProductVariantSrv
} from './productVariant.service';

const ProductVariantController = {
  create: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const productVariant = await createProductVariantSrv({
        ...req.body,
        user_id: id
      });
      respond(res, productVariant, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },
  createBulk: (): RequestHandler => async (req, res, next) => {
    try {
      const productVariant = await createProductVariantBulkSrv(req.body);
      respond(res, productVariant, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  createProductVariantSpec: (): RequestHandler => async (req, res, next) => {
    try {
      const productVariantSpec = await createProductVariantSpecSrv({ ...req.body });
      respond(res, productVariantSpec, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  xcreateProductVariantSpecBulk: (): RequestHandler => async (req, res, next) => {
    try {
      console.log(req.body);
      const productVariantSpec = await createProductVariantSpecBulkSrv(req.body );
      respond(res, productVariantSpec, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  fetchProductVariants: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      let filter = {
        ...req.query
      };
      if (id) {
        filter = {
          ...filter,
          user_id: id
        };
      }
      const userProductVariants = await fetchProductVariantsRepo(filter);
      return respond(res, userProductVariants, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  fetchProductVariantSpec: (): RequestHandler => async (req, res, next) => {
    try {
      let filter = {
        ...req.query
      };
      const productVariantSpecs = await fetchProductVariantSpecRepo(filter);
      return respond(res, productVariantSpecs, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  updateProductVariantDetails: (): RequestHandler => async (req, res, next) => {
    try {
      const { product_variant_id } = req.query as Record<string, string>;
      const productVariantDetails = req.body;
      const updatedProductVariant = await updateProductVariantSrv({ id: product_variant_id }, productVariantDetails);

      return respond(res, updatedProductVariant, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  updateProductVariantSpec: (): RequestHandler => async (req, res, next) => {
    try {
      const { product_variant_spec_id } = req.query as Record<string, string>;
      const productVariantSpecDetails: ProductVariantSpec = req.body;
      const updatedProductVariantSpec = await updateProductVariantSpecSrv({ id: product_variant_spec_id }, productVariantSpecDetails);

      return respond(res, updatedProductVariantSpec, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  deleteProductVariant: (): RequestHandler => async (req, res, next) => {
    try {
      const { product_variant_id } = req.query as Record<string, string>;
      await deleteProductVariantSrv({ id: product_variant_id });
      return respond(res, 'Product variant deleted successfully', StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  deleteProductVariantSpec: (): RequestHandler => async (req, res, next) => {
    try {
      const { product_variant_spec_id } = req.query as Record<string, string>;
      await deleteProductVariantSpecSrv({ id: product_variant_spec_id });
      return respond(res, 'Product variant spec deleted successfully', StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  activateOrDeactivateProductVariant:
    (status: IStatus): RequestHandler =>
    async (req, res, next) => {
      try {
        const { product_variant_id } = req.query as Record<string, string>;
        const product = await activateOrDeactivateProductVariantSrv({ id: product_variant_id }, status);
        return respond(res, product, StatusCodes.OK);
      } catch (error) {
        next(error);
      }
    },

  getAllProductVariants: (): RequestHandler => async (req, res, next) => {
    try {
      const allProductVariants = await fetchProductVariantsSrv({});
      return respond(res, allProductVariants, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default ProductVariantController;
