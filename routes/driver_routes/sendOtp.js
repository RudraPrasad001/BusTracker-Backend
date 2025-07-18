import pool from "../../utils/connectDB.js";
const sendOtp = async(req,res)=>{
    try{
    const {phone_number} = req.body;
    if(!phone_number){
        throw new Error("Could not fetch Phone number");
    }
    if(new String(phone_number).length!==10){
        throw new Error("Enter a valid phone number");
    }
    const result = await pool.query("SELECT * from drivers WHERE phone_number=$1;",[phone_number]);
    if( !result ||result.rowCount===0){
        throw new Error("Phone number not registered");
    }
    return res.json({success:true,message:"OTP Successfully sent"});
}
    catch(e){
        return res.json({success:false,message:e.message});
    }
}
export default sendOtp;