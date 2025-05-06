import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import cors from 'cors';
import {app , server}  from './lib/socket.js';
import dotenv from 'dotenv';
import {connectDB}  from './lib/db.js';
import cookieParser from 'cookie-parser';

import path from "path";

dotenv.config();

// ✅ Enable CORS before any routes or socket.io
const allowedOrigin = 'https://chat-app-frontend-for-production-gru5gx1jv.vercel.app';

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoute);

app.get("/" , (req , res)=>{

res.send("yes i am on this ");

});

const PORT = process.env.PORT || 5001;

server.listen(PORT , () => {
    console.log('Server is running on port'+PORT);
    connectDB();
});



