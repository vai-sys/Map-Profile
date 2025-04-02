const mongoose=require("mongoose");
const connectDB=async (req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoodb connected!");
    }
    catch(err){
        console.error('Error connecting to MongoDB:', err.message);
       
    }
}

module.exports=connectDB;