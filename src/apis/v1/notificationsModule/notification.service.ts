import { createNotificationRepo, fetchNotificationRepo, updateNotificationRepo } from "@src/apis/repositories/notification.repository"
import { Notification } from "@src/interfaces/notification";


export const createNotificationSrv = async (notificationPayload: Partial<Notification>): Promise<any> => {
  
    const notification =  await createNotificationRepo(notificationPayload)
    return notification;
}

export const fetchNotificationSrv = async (filters: Partial<Notification>): Promise<Notification[]> => {
    const notifications = await fetchNotificationRepo(filters)
    return notifications;
};

export const updateNotificationSrv = async (filters: Partial<Notification>, data:Partial<Notification> ): Promise<Notification> => {
    const updatedNotification = await updateNotificationRepo({ id: filters.id }, data);
    return updatedNotification
};