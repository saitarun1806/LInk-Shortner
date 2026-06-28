import mongoose from "mongoose";

    const link_schema= new mongoose.Schema({

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        originalUrl:{
            type: String,
            trim: true,
            required: true,
        },
        shortCode:{
        type:String,
        trim:true,
        required:true,
        unique:true,  
        },
        clicks:{
            type:Number,
            default:0,
        },
        
    },
    {
        timestamps:true,
    },
);

const Link =mongoose.model("Link",link_schema);
export default Link;