import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGDB_URL);
        console.log("Connected to DB")
        
    } catch (err) {
        console.log("Error connecting to DB",err);
        process.exit(1)
    }
}

export default connectDB;