import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

const ADMIN_EMAIL = "admin@yono.com";
const ADMIN_PASSWORD_HASH = bcrypt.hashSync("admin123",10);

router.post("/login", async (req,res)=>{

 const {email,password} = req.body;

 if(email !== ADMIN_EMAIL){
  return res.status(401).json({message:"Invalid credentials"});
 }

 const valid = await bcrypt.compare(password,ADMIN_PASSWORD_HASH);

 if(!valid){
  return res.status(401).json({message:"Invalid credentials"});
 }

 const token = jwt.sign(
  {role:"admin"},
  process.env.JWT_SECRET,
  {expiresIn:"1d"}
 );

 res.json({token});

});

export default router;