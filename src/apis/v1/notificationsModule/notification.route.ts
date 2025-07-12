import authenticate from '@src/apis/middleware/authenticate.middleware';
import { Router } from 'express';
import NotificationController from './notification.controller';

const notificationRouter = Router();

notificationRouter.get('/', authenticate(), NotificationController.fetchUserNotifications());
notificationRouter.post('/update', authenticate(), NotificationController.updateNotificationStatus());


export default notificationRouter;
