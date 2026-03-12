import jwt from "jsonwebtoken";
 
const isAuthenticated=async(req,res,next)=>
{
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message:"User is not Authenticated",
                success:false,
            })
        }
        const decode=await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                 message:"Invalid Token",
                success:false,
            })
        };
        req.id=decode.userId;
        next();
    } catch (error) {
        console.log(error);
         console.log("Auth Error:", error.message);
        return res.status(401).json({
            message: "Authentication Failed",
            success: false,
        });
    }
}
export default isAuthenticated;