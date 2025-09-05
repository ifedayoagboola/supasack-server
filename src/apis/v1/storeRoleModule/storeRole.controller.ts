import { BadRequestError } from '@src/common/errors';
import { respond } from '@src/utilities';
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createStoreRoleSrv, deleteStoreRoleSrv, getAllAssignedStoresSrv, getStoreRolesSrv, updateStoreRoleSrv } from './storeRole.service';
import { deleteUserAccountSrv } from '../authModule/auth.service';

const StoreRoleController = {
  createStoreRole: (): RequestHandler => async (req, res, next) => {
    try {
      const { email, store_id, role_id } = req.body;
      const created_by = res.locals.user.id;
      const createdStoreRole = await createStoreRoleSrv({ store_id, role_id, email, created_by });

      respond(res, createdStoreRole, StatusCodes.OK);
      return createdStoreRole;
    } catch (error) {
      next(error);
    }
  },

  findStoresAssignedToRoles: (): RequestHandler => async (req, res, next) => {
    try {
      const { id } = res.locals.user;
      const getAllAssignedStores = await getAllAssignedStoresSrv({ user_id: id });
      respond(res, getAllAssignedStores, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  fetchStoreRoles: (): RequestHandler => async (req, res, next) => {
    try {
      const { store_id } = req.query as Record<string, string>;
      const storeRoles = await getStoreRolesSrv({ store_id });
      respond(res, storeRoles, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  updateStoreRole: (): RequestHandler => async (req, res, next) => {
    try {
      const { store_role_id } = req.query as Record<string, string>;
      const storeRoleDetails = req.body;
      const updatedStoreRole = await updateStoreRoleSrv({ id: store_role_id }, storeRoleDetails);
      return respond(res, updatedStoreRole, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  },

  deleteStoreRole: (): RequestHandler => async (req, res, next) => {
    try {
      const { store_role_id } = req.query as Record<string, string>;
      const deletedStoreRole = await deleteStoreRoleSrv({ id: store_role_id });
      return respond(res, deletedStoreRole, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default StoreRoleController;
