import { respond } from "@src/utilities";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { fetchStoreTransactionsSrv } from "./transactions.service";


const TransactionController = {
  fetchStoreTransactions: (): RequestHandler => async (req, res, next) => {
    try {
      const { store_id } = req.query as Record<string, string>;
      const storeId = store_id;
      const transactions = await fetchStoreTransactionsSrv(storeId);
      return respond(res, transactions, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default TransactionController;