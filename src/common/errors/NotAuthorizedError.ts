import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import ErrorHandler from './ErrorHandler';

export default class NotAuthorizedError extends ErrorHandler {
  protected error_name = ReasonPhrases.UNAUTHORIZED;

  protected httpCode = StatusCodes.FORBIDDEN;

  public constructor(message: string = ReasonPhrases.UNAUTHORIZED, error: Error = undefined, data: any = null) {
    super(message, error, data);
    Error.captureStackTrace(this, this.constructor);
  }
}
