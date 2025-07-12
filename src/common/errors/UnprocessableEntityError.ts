import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import ErrorHandler from './ErrorHandler';

export default class UnprocessableEntityError extends ErrorHandler {
  protected error_name = ReasonPhrases.UNPROCESSABLE_ENTITY;
  protected httpCode = StatusCodes.UNPROCESSABLE_ENTITY;

  constructor(
    message = 'The request could not be completed due to the instructions contained being unprocessable',
    error: Error = undefined,
    data: any = null
  ) {
    super(message, error, data);
    Error.captureStackTrace(this, this.constructor);
  }
}
