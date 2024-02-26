import  Jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";

const auth = (req,res,next)=>{
    const token = req.cookie.token;
    try {
        const user = Jwt.verify(token, process.env.jwtsecret);
        req.user = user;
        next();
    } catch (err) {
        res.clearcookie("token");
        res.status(500).json({"message" :"internal error"});
        console.log(err)
    }
}

export default auth;