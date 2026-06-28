import express from "express";
import { nanoid } from "nanoid";

import Link from "../model/Link.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/shorten",authMiddleware, async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                message: "url is required",
            });
        }

        const shortCode = nanoid(6);

        const link = await Link.create({
            userId:req.userId,
            originalUrl: url,
            shortCode,
        });
        const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

        res.status(200).json({
            success: true,
            shortUrl,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

router.get("/links",authMiddleware, async(req,res)=>{
    try{
        const links = await Link.find({
            userId:req.userId
        }).sort({createdAt:-1});
        res.status(200).json({
            success:true,
            count:links.length,
            links
                
        });
    }catch(err){
        res.status(404).json({message:err.message});
    }
});

router.get("/links/:id",authMiddleware,async(req,res)=>{
    try{
        const link = await Link.findOne({
            _id:req.params.id,
            userId:req.userId
        });
        if(!link){
            return res.status(404).json({
                message:"Link Not Found"
            });
        }
        res.status(200).json(link);
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

router.put("/links/:id",authMiddleware,async(req,res)=>{
    try{
        const {originalUrl}=req.body;
        const link= await Link.findOneAndUpdate(
            {
                _id:req.params.id,
                userId:req.userId
            },
            {
                originalUrl
            },
            {
                new:true
            }
        );
        if(!link){
            return res.status(404).json({
                message:"Link Not Found"
            });
        }
        res.status(200).json({
            success: true,
            link
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

router.delete("/links/:id",authMiddleware,async(req,res)=>{
    try{
        const link = await Link.findOneAndDelete({
            _id:req.params.id,
            userId:req.userId
        });
        if(!link){
            return res.status(404).json({
                message:"Link not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"link deleted successfully"
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
});


export default router;