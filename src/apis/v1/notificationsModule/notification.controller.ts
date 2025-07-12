import { respond } from "@src/utilities";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { fetchNotificationSrv, updateNotificationSrv } from "./notification.service";

const NotificationController = {
    fetchUserNotifications: (): RequestHandler => async (req, res, next) => {
        try {
            const { id } = res.locals.user;
            const userNotifications = await fetchNotificationSrv({user_id: id})
            respond(res, userNotifications, StatusCodes.OK);
        }catch(error){
            next(error);
        }
    },
    updateNotificationStatus: (): RequestHandler => async (req, res, next) => {
        try {
            const { notification_id } = req.query as Record<string, string>;
            await updateNotificationSrv({id: notification_id}, {status: 'READ'})
            return respond(res, "notification updated", StatusCodes.OK)
        } catch (error) {
            next(error);
        }
    }
}

export default NotificationController;