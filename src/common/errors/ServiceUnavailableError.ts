import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import ErrorHandler from './ErrorHandler';
export default class ServiceUnavailableError extends ErrorHandler {
  protected error_name = ReasonPhrases.SERVICE_UNAVAILABLE;

  protected httpCode = StatusCodes.SERVICE_UNAVAILABLE;

  public constructor(message: string = ReasonPhrases.SERVICE_UNAVAILABLE, error: Error = undefined, data: any = null) {
    super(message, error, data);
    Error.captureStackTrace(this, this.constructor);
  }
}
