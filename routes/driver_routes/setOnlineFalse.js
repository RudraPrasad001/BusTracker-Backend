import pool from "../../utils/connectDB.js";
const setOnlineFalse = async(req,res)=>{
    try{
        const {routeNumber} = req.body;
        const doesExist = await pool.query("SELECT bus_number FROM buses where bus_number=$1",[routeNumber]);
        if(doesExist.rowCount===0){
            throw new Error("Bus Number does not exist");
        }
        const result = await pool.query("UPDATE buses SET is_online=false where bus_number=$1",[routeNumber]);
        return res.json({success:true,message:`Bus number ${routeNumber} is offline`});
    }
    catch(e){
        return res.json({success:false,message:e.message});
    }

}
export default setOnlineFalse;