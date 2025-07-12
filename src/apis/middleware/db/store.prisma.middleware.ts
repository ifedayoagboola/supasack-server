import { Prisma } from '@prisma/client';

const storePrismaMiddleware = async (params: Prisma.MiddlewareParams) => {
  switch (params.action) {
    case 'create':
      if (params.model === 'Store') {
      }
      break;

    default:
      break;
  }
};

export default storePrismaMiddleware;
