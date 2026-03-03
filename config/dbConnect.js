const mongoose=require("mongoose")

const dbConnect=async()=>{
    await mongoose.connect(process.env.MONGO_DB_URL);
}

module.exports=dbConnect