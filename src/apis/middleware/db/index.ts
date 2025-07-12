import { PrismaClient } from '@prisma/client';
import storePrismaMiddleware from './store.prisma.middleware';
import userPrismaMiddleware from './user.prisma.middleware';

const prisma = new PrismaClient();

const databaseMiddleware = () =>
  prisma.$use(async (params: any, next: (params: any) => any) => {
    storePrismaMiddleware(params);
    userPrismaMiddleware(params);
    return next(params);
  });

databaseMiddleware();

export default prisma;
