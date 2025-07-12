import authenticate from '@src/apis/middleware/authenticate.middleware';
import { fetchTransactionSchema } from '@src/apis/schemas/transaction.schema';
import { Router } from 'express';
import TransactionController from './transactions.controller';

const transactionRouter = Router();

transactionRouter.get('/', authenticate(), fetchTransactionSchema, TransactionController.fetchStoreTransactions());

export default transactionRouter;
