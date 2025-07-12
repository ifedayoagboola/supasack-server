import { waitlistSchema } from '@src/apis/schemas/waitlist.schema';
import { Router } from 'express';
import WaitlistController from './waitlist.controller';

const waitlistRouter = Router();

waitlistRouter.post('/', waitlistSchema, WaitlistController.addToWaitlist());

export default waitlistRouter;
