import express from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../model/User.js";



const router = express.Router();
router.post("/register",async(req,res)=>{
    try{
        const { fullName,email,password}=req.body;
        if(!fullName || !email || !password){
            return res.status(400).json({
                message:"give all details"
            });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"email already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            message:"User Created Successfully"
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
})

router.post("/login", async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                message:"Email and Password are Required"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Invalid password"
            });
        }
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );
        res.status(200).json({
            success:true,
            message:"Login successful.",
            token,
            user:{
                id: user._id,
                fullName:user.fullName,
                email:user.email,
            }
        });
       }catch(err){
        res.status(500).json({
            message: err.message
        });
       }
})

export default router;