import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import ErrorHandler from './ErrorHandler';

export default class ResourceNotFoundError extends ErrorHandler {
  protected error_name = ReasonPhrases.NOT_FOUND;

  protected httpCode = StatusCodes.NOT_FOUND;

  public constructor(message: string = ReasonPhrases.NOT_FOUND, error: Error = undefined, data: any = null) {
    super(message, error, data);
    Error.captureStackTrace(this, this.constructor);
  }
}
