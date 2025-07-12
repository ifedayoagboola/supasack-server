import { PrismaClient } from '@prisma/client';
import { Notification } from '@src/interfaces/notification';

const prisma = new PrismaClient();

export const createNotificationRepo = async (notificationDetails: Partial<Notification>): Promise<Notification> => {
    const {user_id, message, reference, action, type, isPublic, isStore}= notificationDetails
    const notification = await prisma.notifications.create({
    data: {user_id, message, reference, action, isPublic, isStore, type, store_id: notificationDetails?.store_id}
  });

  return notification;
};

export const createBulkNotificationRepo = async (data: Partial<Notification[]>): Promise<Notification[] | any> => {
  // const { user_id, message, reference, action, type, isPublic, isStore } = notificationDetails;
  const notification = await prisma.notifications.createMany({data});

  return notification;
};

export const fetchNotificationRepo = async (filter: Partial<Notification>): Promise<Notification[]> => {
  const notification = await prisma.notifications.findMany({
    where: { ...filter }
  });
  return notification;
};

export const updateNotificationRepo = async (filters: { id: string }, data: Partial<Notification>): Promise<Notification> => {
    const notification = await prisma.notifications.update({
    data: {
      ...data
    },
    where: filters
  });
  return notification;
};