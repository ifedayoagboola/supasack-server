import { fetchProductsByStoreRepo, searchProductByName, softDeleteProductRepo } from '@src/apis/repositories/product.repository';
import { NOTIFICATION_ACTIONS, NOTIFICATION_TYPE } from '@src/constants/notification.constant';
import { STATUS } from '@src/constants/store.constant';
import { IStatus } from '@src/interfaces/generals';
import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createNotificationSrv } from '../notificationsModule/notification.service';
import {
  activateOrDeactivateProductSrv,
  createBulkProductSrv,
  createProductByAdminSrv,
  createProductSrv,
  deleteProductSrv,
  fetchProductsSrv,
  findProductsByStoreSrv,
  findProductSrv,
  findProductsWithVariantsSrv,
  getProductDeliverySrv,
  searchSrv,
  updateProductSrv
} from './product.service';
import { Product } from '@src/interfaces/product';

const ProductController = {
  create: (): RequestHandler => async (req, res, next) => {
    try {
      const { id, user_role } = res.locals.user;

      const {
        name,
        description,
        slug,
        category_id,
        store_id,
        weight_unit,
        subcategory_id,
        quantity,
        quantity_alert,
        price,
        discount,
        images,
        manufactured_date,
        manufacturer,
        expiry_date
      } = req.body;

      let product: Product;
      //const delivery_duration = Number(estimated_delivery_duration) + 2;
      if (user_role.level === 100) {
        await createProductByAdminSrv({
          name,
          description,
          slug,
          category_id,
          user_id: id,
          store_id,
          weight_unit,
          subcategory_id,
          quantity,
          quantity_alert,
          price,
          discount,
          images,
          manufactured_date,
          manufacturer,
          expiry_date
        });
      } else {
        product = await createProductSrv({
          name,
          description,
          slug,
          status,
          category_id,
          user_id: id,
          store_id
        });
      }

      await createNotificationSrv({
        user_id: id,
        message: `Your product ${name} was created successfully`,
        reference: category_id,
        action: NOTIFICATION_ACTIONS.VIEW,
        type: NOTIFICATION_TYPE.PRODUCT,
        store_id
      });
      respond(res, 'Product was created successfully', StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  createBulk: (): RequestHandler => async (req, res, next) => {
    try {
      console.log(req.body);
      const product = await createBulkProductSrv(req.body);

      respond(res, product, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  getAllUserProducts: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const userProducts = await fetchProductsSrv({ user_id: id });
      return respond(res, userProducts, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  fetchProducts: (): RequestHandler => async (req, res, next) => {
    try {
      const id = res?.locals?.user?.id;
      let filter = {
        ...req.query
      };

      if (id) {
        filter.user_id = id;
      } else {
        filter.status = STATUS.ACTIVE;
      }

      const userProducts = await fetchProductsSrv(filter);
      return respond(res, userProducts, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  fetchAllProductsAdmin: (): RequestHandler => async (req, res, next) => {
    try {
      const id = res?.locals?.user?.id;
      let filter = {
        ...req.query
      };

      const userProducts = await fetchProductsSrv(filter);
      return respond(res, userProducts, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  getProductBySlug: (): RequestHandler => async (req, res, next) => {
    try {
      const { slug } = req.query as Record<string, string>;
      const product = await findProductSrv({ slug });
      return respond(res, product, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  getAllProductsByStore: (): RequestHandler => async (req, res, next) => {
    try {
      const { store_id } = req.params;
      const product = await findProductsByStoreSrv({ store_id });
      return respond(res, product, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  getProductById: (): RequestHandler => async (req, res, next) => {
    try {
      const { store_id } = req.params as Record<string, string>;
      const product = await findProductsWithVariantsSrv({ id: store_id });
      return respond(res, product, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  updateProductDetails: (): RequestHandler => async (req, res, next) => {
    try {
      const { product_id } = req.query as Record<string, string>;
      const productDetails = req.body;
      const updatedProduct = await updateProductSrv({ id: product_id }, productDetails);
      return respond(res, updatedProduct, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  activateOrDeactivateProduct:
    (status: IStatus): RequestHandler =>
    async (req, res, next) => {
      try {
        const { product_id } = req.query as Record<string, string>;
        const product = await activateOrDeactivateProductSrv({ id: product_id }, status);
        return respond(res, product, StatusCodes.OK);
      } catch (error) {
        next(error);
      }
    },

  deleteProduct: (): RequestHandler => async (req, res, next) => {
    try {
      const { product_id } = req.query as Record<string, string>;
      const deletedProduct = await softDeleteProductRepo({ id: product_id });
      return respond(res, 'Product deleted successfully', StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  getAllProducts: (): RequestHandler => async (req, res, next) => {
    try {
      const allProducts = await fetchProductsSrv({});
      return respond(res, allProducts, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  fetchProductDeliveryFee: (): RequestHandler => async (req, res, next) => {
    try {
      const payload = req.body;
      const fetchDeliveryFee = await getProductDeliverySrv(payload);
      const { max_quoted_fee, vat } = fetchDeliveryFee;
      const deliveryFee = {
        delivery_Fee: max_quoted_fee + vat
      };

      return respond(res, deliveryFee, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  search: (): RequestHandler => async (req, res, next) => {
    try {
      const searchString = req.query.search_string;

      const result = await searchProductByName(searchString.toString());

      return respond(res, result, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default ProductController;
