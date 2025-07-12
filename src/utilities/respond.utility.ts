import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    limit: number;
    count: number;
    hasNext: boolean;
  };
}

export const generatePaginationMeta = <T>(payload: T[], limit: number): PaginatedResponse<T> => {
  const hasNext = payload.length > limit;
  const data = hasNext ? payload.slice(0, -1) : payload;

  return {
    data,
    meta: {
      limit,
      hasNext,
      count: hasNext ? limit : payload.length
    }
  };
};

const respond = <T>(
  res: Response,
  payload: T,
  statusCode: number = StatusCodes.OK,
  errors: unknown = null,
  meta: Record<string, unknown> = {}
): Response => {
  const isError = statusCode >= 400;
  const status = isError ? 'error' : 'success';
  const payloadKey = isError ? 'message' : 'data';

  const response = {
    status,
    [payloadKey]: payload,
    meta,
    ...(isError && errors ? { data: errors } : {})
  };

  return res.status(statusCode).json(response);
};

export default respond;
