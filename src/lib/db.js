import mongoose from 'mongoose';

export const connectDB = async () => {

    try {
        console.log("readty to connect");
     const conn =await mongoose.connect(process.env.MONGODB_URI);
     console.log(`MongoDB Connected: ${conn.connection.host}`);
     
     console.log("MongoDB Connected");
        
    } catch (error) {
        console.error(`Error: ${error}`);
        
    }

};