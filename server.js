import express from "express";
import initializeDB from "./utils/initializeDB.js";
import adminRouter from "./routes/admin_routes/adminRoutes.js";
import bodyParser from "body-parser";
import basicRouter from "./routes/basic_routes/basicRoutes.js";
import driverRouter from "./routes/driver_routes/driverRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
//To initialize the tables
initializeDB();
app.use(express.json());
app.use("/admin",adminRouter);
app.use("/driver",driverRouter);
app.use("/",basicRouter);
app.listen(3000,()=>{
    console.log("Server Running");
})