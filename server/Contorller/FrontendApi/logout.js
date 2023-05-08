
const Logout=async(req,res)=>{
    res.clearCookie("access_token");
    res.status(200).json("Logout Sucessfully" );
}

module.exports=Logout