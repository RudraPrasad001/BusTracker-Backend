import express from "express";
import sendOtp from "./sendOtp.js";
import verifyOtp from "./verifyOtp.js";
import linkDriver from "./linkDriver.js";
const driverRouter = express.Router();
driverRouter.post("/sendotp",sendOtp);
driverRouter.post("/verifyotp",verifyOtp);
driverRouter.post("/linkdriver",linkDriver);
export default driverRouter;