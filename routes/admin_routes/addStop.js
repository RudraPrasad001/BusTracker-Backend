import pool from "../../utils/connectDB.js";
const addStop = async(req,res)=>{
    const {stop_name,latitude,longitude} = req.body;
    if(!stop_name ||!latitude || !longitude ){
        //If there are any missing fields
        return res.json({
            success:false,
            message:"Missing Credentials"
        });
    }
     try{
        //trying to add a Stop
    const result = await pool.query(`INSERT INTO stops(stop_name,latitude,longitude) VALUES ('${stop_name}','${latitude}','${longitude}');`);
    return res.json({
        success:true,
        message:"Stop Successfully Added"
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
export default addStop;