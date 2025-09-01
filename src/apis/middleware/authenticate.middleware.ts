import { Request, Response, NextFunction } from 'express';
import { NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
import { NotAuthenticatedError } from '@src/common/errors';
import { JWT } from '@src/utilities';
import { findAuthUser, findUserRepo } from '@src/apis/repositories/auth.repository';

const authenticate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(new NotAuthenticatedError('No token provided'));
    }

    const [, token] = authorization.split(' ');

    try {
      if (!token) {
        return next(new NotAuthenticatedError('No token provided'));
      }

      const decoded = JWT.decode(token);

      const user = await findAuthUser({ id: decoded.id });
      if (!user) {
        return next(new NotAuthenticatedError('Invalid token'));
      }

      if (user.isDeleted) {
        return next(new NotAuthenticatedError('user authentication failed'));
      }
      
      res.locals.user = user;

      return next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.log( "test error-expired")
        return next(new NotAuthenticatedError('Token has expired'));
      }

      if (error instanceof NotBeforeError) {
        return next(new NotAuthenticatedError('Token used prematurely'));
      }

      return next(error);
    }
  };
};

export default authenticate;
