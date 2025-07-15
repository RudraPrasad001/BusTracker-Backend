import express from "express";
import getBuses from "../admin_routes/getBuses.js";
import checkBasic from "./check.js";
const basicRouter = express.Router();
basicRouter.get("/get/bus",getBuses);
basicRouter.get("/",checkBasic);

export default basicRouter;