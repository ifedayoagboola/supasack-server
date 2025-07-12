import { Waitlist } from "@src/interfaces/waitlist";
import { respond } from "@src/utilities";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { waitlistRegistrationSrv } from "./waitlist.service";


const WaitlistController = {
  addToWaitlist: (): RequestHandler => async (req, res, next) => {
    try {
      const payload: Waitlist = req.body;
      
      const addToWaitlist = await waitlistRegistrationSrv(payload)
      return respond(res, addToWaitlist, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
};

export default WaitlistController;