import express from "express";
import getBuses from "./getBuses.js";
import checkBasic from "./check.js";
import getStop from "./getStops.js";
const basicRouter = express.Router();
basicRouter.get("/get/bus",getBuses);
basicRouter.get("/",checkBasic);
basicRouter.get("/get/stop",getStop);
export default basicRouter;