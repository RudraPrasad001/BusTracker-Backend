import express from "express";
import sendOtp from "./sendOtp.js";
import verifyOtp from "./verifyOtp.js";
const driverRouter = express.Router();
driverRouter.post("/sendotp",sendOtp);
driverRouter.post("/verifyotp",verifyOtp);
export default driverRouter;