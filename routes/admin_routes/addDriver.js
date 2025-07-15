import pool from "../../utils/connectDB.js";
const addDriver = async(req,res)=>{
    const {phone_number,name} = req.body;
    if(!phone_number || !name){
        //If there are any missing fields
        return res.json({
            success:false,
            message:"Missing Credentials"
        });
    }
     try{
        //trying to add a Driver
    const result = await pool.query(`INSERT INTO drivers(phone_number,name) VALUES (${phone_number},'${name}');`);
    return res.json({
        success:true,
        message:"Driver Successfully Added"
    })
    }
    catch(e){
        //error while adding Driver
        return res.json({
            success:false,
            message:"Something Went wrong with the database"
        })
    }
}
export default addDriver;