import express from "express";
import {User} from "../model/user.model.js"
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";


const router = express.Router();


router.get("/alluser",(req,res)=>{
    res.send("hello  welcome to in the world")
})
router.post("/register",async(req,res)=>{
  try {
    const { username ,email ,password } = req.body;

    if(!(username && email && password)){
        res.status(400).json({"message":"all field are required"});
    }
    
    const existUser = await User.findOne({email});
    if(existUser){
        res.status(401).json({"message":"User is already is exist in database"})
    }

  const myEncPassword = await bcrypt.hash(password ,10);
  const user = await User.create({
    username,
    email,
    password:myEncPassword,
  })
  console.log(user);

  res.status(200).json({"message": "user is successfully registered"});


  } catch (error) {
    console.log(error);
    res.status(400).json({"message":"internal error"})
  }

})


router.post("/login",async(req,res)=>{
   try {
    const {email ,password} = req.body;
    if(!(email && password)){
        res.status(400).json({"message":"all field is compulsory"})
    }
   const user = await User.findOne({email});
   if(!user){
    res.status(400).json({"message":"user is not exist in database"})
   }

   if(user && (await bcrypt.compare(password, user.password))){
      
    const token = Jwt.sign(
        {id: user._id},
        process.env.jwtsecret,
        {
            expiresIn: "12hr"
        }
    );
    user.password = undefined;
    
    const options = {
        expires: new Date(Date.now()+3*24*60*60*1000),
        httpOnly: true
    }

    res.status(200).cookie("token", token , options).json({success:true,
    token,
    user})
    res.status(200).json(user);

   }

   } catch (error) {
    console.log(error);
    res.status(500).json({"message":"internal error"})
   }
})

export default router;