import express from "express";
import initializeDB from "./utils/initializeDB.js";
import adminRouter from "./routes/admin_routes/adminRoutes.js";
import bodyParser from "body-parser";
const app = express();
//To initialize the tables
initializeDB();
app.use(express.json());
app.use("/admin",adminRouter);
app.listen(3000,()=>{
    console.log("Server Running");
})