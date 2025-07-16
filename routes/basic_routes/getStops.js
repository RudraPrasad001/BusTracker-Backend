import pool from "../../utils/connectDB.js";
const getStop = async(req,res)=>{


     try{
        //trying to get Stops
    const result = await pool.query(`SELECT * FROM stops;`);
    return res.json({
        success:true,
        message:"Successfully fetched the stops",
        stops:result.rows
    })
    }
    catch(e){
        //error while adding Stop
        return res.json({
            success:false,
            message:"Something Went wrong with the database"
        })
    }
}
export default getStop;