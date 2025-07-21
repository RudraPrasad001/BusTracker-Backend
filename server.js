import express from "express";
import cors from "cors";
import http from "http";
import initializeDB from "./utils/initializeDB.js";
import adminRouter from "./routes/admin_routes/adminRoutes.js";
import bodyParser from "body-parser";
import basicRouter from "./routes/basic_routes/basicRoutes.js";
import driverRouter from "./routes/driver_routes/driverRoutes.js";
import initializeSocket from "./sockets/socket.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const server = http.createServer(app);
//To initialize the tables
initializeDB();
initializeSocket(server);
app.use(express.json());
app.use(cors({origin:"*"}));
app.use("/admin",adminRouter);
app.use("/driver",driverRouter);
app.use("/",basicRouter);
server.listen(3000,()=>{
    console.log("Server Running");
})