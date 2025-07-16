import express from "express";
import initializeDB from "./utils/initializeDB.js";
import adminRouter from "./routes/admin_routes/adminRoutes.js";
import bodyParser from "body-parser";
import basicRouter from "./routes/basic_routes/basicRoutes.js";
const app = express();
//To initialize the tables
initializeDB();
app.use(express.json());
app.use("/admin",adminRouter);
app.use("/",basicRouter);
app.listen(3000,()=>{
    console.log("Server Running");
})