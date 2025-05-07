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


const allowedOrigins = [
  'https://chat-app-frontend-for-production.vercel.app',
  'https://chat-app-frontend-for-production-gru5gx1jv.vercel.app',
  'https://chat-app-frontend-for-git-d0e7fa-ahmadali43a5gmailcoms-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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



