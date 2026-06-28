import mongoose, { connect } from "mongoose"



const connectionDB = async()=>{
    const mongo_url=process.env.MONGODB_URL;
    if(!mongo_url){
        throw new Error("Mongo Db Url not found in .env")
    }
    try{
        const conn= await mongoose.connect(mongo_url);
        console.log(`Mongoose  Connceted: ${conn.connection.host}`);

    }catch(err){
        console.log("mongodb error:",err.message);
    }
};

export default connectionDB;