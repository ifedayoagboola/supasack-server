import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import ErrorHandler from './ErrorHandler';

export default class ConflictError extends ErrorHandler {
  protected error_name = ReasonPhrases.CONFLICT;
  protected httpCode = StatusCodes.CONFLICT;

  constructor(
    message = 'The request could not be completed due to a conflict with the current state of the target resource',
    error: Error = undefined,
    data: any = null
  ) {
    super(message, error, data);
    Error.captureStackTrace(this, this.constructor);
  }
}
