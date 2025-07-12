import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import ErrorHandler from './ErrorHandler';

export default class BadRequestError extends ErrorHandler {
  protected error_name = ReasonPhrases.BAD_REQUEST;

  protected httpCode = StatusCodes.BAD_REQUEST;

  public constructor(message: string = ReasonPhrases.BAD_REQUEST, error: Error = undefined, data: any = null) {
    super(message, error, data);
    Error.captureStackTrace(this, this.constructor);
  }
}
