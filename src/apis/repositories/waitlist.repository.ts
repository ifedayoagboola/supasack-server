import { PrismaClient } from '@prisma/client';
import { Waitlist } from '@src/interfaces/waitlist';


const prisma = new PrismaClient();

export const addToWaitlistRepo = async (wishlistDetails: Partial<Waitlist>): Promise<Waitlist> => {
  const waitlist = await prisma.waitlist.create({
    data: {
      full_name: wishlistDetails.full_name,
      email: wishlistDetails.email
    }
  });
  return waitlist;
};

export const fetchAllWaitlistsRepo = async (): Promise<Waitlist[]> => {
 return  await prisma.waitlist.findMany();
};

export const getWaitlistDetailByIdRepo = async (id: string): Promise<Waitlist> => {
  return  await prisma.waitlist.findUnique({
    where: {id}
  });
 };