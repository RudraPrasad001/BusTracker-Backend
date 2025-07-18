import pool from "../../utils/connectDB.js";
const linkDriver = async(req,res)=>{
    try{
        const {driver_id,number_plate} = req.body;
        let driverResult = await pool.query("SELECT driver_id FROM drivers where driver_id=$1",[driver_id]);
        if(driverResult.rowCount===0){
            throw new Error("Could not find driver");
        }
        let numberPlateResult = await pool.query("SELECT bus_id from buses where number_plate=$1",[number_plate]);
        if(numberPlateResult.rowCount===0){
            throw new Error("Could not find a bus with the given number plate");
        }
        await pool.query(`UPDATE drivers SET bus_id=${numberPlateResult.rows[0].bus_id} WHERE driver_id=${driver_id}`);
        return res.json({success:true,message:"Linked Driver with the Bus"});
    }
    catch(e){
        return res.json({success:false,message:e.message})
    }
}
export default linkDriver;