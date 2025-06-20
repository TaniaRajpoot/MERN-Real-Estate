import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import cookieParser from  'cookie-parser'
import listingRouter from './routes/listing.route.js'
import cors from 'cors';
dotenv.config();




mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB!");
   }).catch((err)=> {
    console.log(err);
});


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // if you use cookies, otherwise can be false
}));
app.use(express.json());
app.use(cookieParser());


app.listen (3000 , () =>{
    console.log("server is running on port 30000");

});


app.use('/api/user', userRoute);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode: statusCode,
        message,
    });

})