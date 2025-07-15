import express from "express";
import initializeDB from "./utils/initializeDB.js";
const app = express();
initializeDB();
app.listen(3000,()=>{
    console.log("Server Running");
})