import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';

import { respond, logger } from '@src/utilities';
import ErrorHandler from '@src/common/errors/ErrorHandler';

// Define a type for the errors object
type ErrorDetails = {
  [key: string]: { message: string };
};

export default function handleErrors(err: Error, req: Request, res: Response, _next: NextFunction): Response {
  if (err instanceof ErrorHandler) {
    return respond(res, err.message, err.getHttpCode());
  }

  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body') || err.details.get('query') || err.details.get('params');

    // Ensure errorBody.details is properly typed
    const errors: ErrorDetails = errorBody.details.reduce((acc: ErrorDetails, val) => {
      const key = val.path.join('.');
      const message = val.message.replace(/['"]+/g, '');
      acc[key] = { message };
      return acc;
    }, {} as ErrorDetails); // Use type assertion to ensure correct type

    return respond<string>(res, 'Validation Error', HttpStatus.BAD_REQUEST, errors);
  }

  logger.error('Internal Error', err);

  return respond<string>(res, 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
}
