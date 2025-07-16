import pool from "../../utils/connectDB.js";
//To register drivers into the database
const addBus = async(req,res)=>{
    const {bus_number,route_name,number_plate} = req.body;
    if(!bus_number || !route_name || !number_plate){
        //If there is any missing fields
        return res.json({
            success:false,
            message:"Invalid Credentials"
        });
    }
    try{
        //trying to add a bus
    const result = await pool.query(`INSERT INTO buses(bus_number,route_name,number_plate) VALUES (${bus_number},'${route_name}','${number_plate}');`);
    return res.json({
        success:true,
        message:"Bus Successfully Added"
    })
    }
    catch(e){
        //error while adding bus
        return res.json({
            success:false,
            message:"Something Went wrong with the database"
        })
    }
}
export default addBus;