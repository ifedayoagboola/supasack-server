import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export default class ErrorHandler extends Error {
  protected error_code: string;

  protected error_name = ReasonPhrases.INTERNAL_SERVER_ERROR;

  protected internal: Error;

  protected status = 'error';

  protected httpCode = StatusCodes.INTERNAL_SERVER_ERROR;

  protected data: { [key: string]: any };

  public constructor(message: string, error: Error = undefined, data: { [key: string]: any }) {
    super(message);
    this.internal = error;
    this.data = data;
    this.status = 'error';
  }

  public getStatus() {
    return this.status;
  }

  public getCode() {
    return this.error_code;
  }

  public getInternalError() {
    return this.internal;
  }

  public getHttpCode() {
    return this.httpCode;
  }

  public getData() {
    return this.data;
  }

  public getName() {
    return this.error_name;
  }
}
