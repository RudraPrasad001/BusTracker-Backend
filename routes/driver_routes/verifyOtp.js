import pool from "../../utils/connectDB.js";
import jwt from "jsonwebtoken"

const verifyOtp = async(req,res)=>{
    try{
    const {otp,phone_number} =  req.body;
    console.log(otp);
    if(!phone_number){
        throw new Error("Could not fetch Phone number");
    }
    if(phone_number.phone_number.toString().length!==10){
        console.log(phone_number.phone_number);
        console.log(new String(phone_number).length)
        throw new Error("Could not fetch Phone number");
    }
    const result = await pool.query("SELECT * from drivers WHERE phone_number=$1;",[phone_number.phone_number]);
    if( !result ||result.rowCount===0){
        throw new Error("Phone number not registered");
    }
    if(!otp){
        throw new Error("Enter otp");
    }
    if(otp.toString().length!=4){
        throw new Error("Enter a valid otp");
    }

    const data = result.rows[0];
    const token  = jwt.sign(data,process.env.JWT,{expiresIn:"1d"});
    return res.json({token});
    }
    catch(e){
        return res.json({success:false,message:e.message});
    }
}
export default verifyOtp;