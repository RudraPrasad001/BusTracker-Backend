const checkAdmin = (req,res)=>{
    return res.json({
        success:true,
        message:"Hello Admin"
    })
}
export default checkAdmin;