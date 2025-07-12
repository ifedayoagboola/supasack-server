import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

const userPrismaMiddleware = (params: Prisma.MiddlewareParams) => {
  if (params.model === 'User') {
  }
  switch (params.action) {
    case 'create':
      if (params.model === 'User') {
        const { password } = params.args['data'];
        params.args['data'].password = bcrypt.hashSync(password, 10);
      }
      break;
    case 'update':
      if (params.model === 'User') {
        const { password } = params.args['data'];
        if (password) {
          params.args['data'].password = bcrypt.hashSync(password, 10);
        }
      }

    default:
      break;
  }
};

export default userPrismaMiddleware;
