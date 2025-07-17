import jwt from "jsonwebtoken"

const verifyOtp = async(req,res)=>{
    const {otp} =  req.body;
    console.log(otp);
    const data = {name:"ninj",id:1001};
    const token  = jwt.sign(data,process.env.JWT,{expiresIn:"1d"});
    return res.json({token});
}
export default verifyOtp;