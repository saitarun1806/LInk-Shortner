import express from "express";
import dotenv from "dotenv";

import connectionDB from "./src/config/db.js";
import linkRoutes from "./src/routes/linkRoutes.js"
import authRoutes from "./src/routes/authRoutes.js"
import Link from "./src/model/Link.js";
import cors from "cors";


dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({message:"successfully working"});
});

app.get("/:shortCode", async(req,res) =>{
    try{
        const{shortCode}=req.params;

        const link = await Link.findOne({shortCode});
        if(!link){
            return res.status(404).json({
                message:"Link not found"
            });
        }
        link.clicks +=1;
        await link.save();
        return res.redirect(link.originalUrl);
    }catch(err){
        return res.status(500).json({
            message: err.message
        });
    }
});

app.use("/api/v1",linkRoutes);
app.use("/api/v1/auth",authRoutes);
connectionDB();
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on http//:localhost:${PORT}`)
})
