import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv  from 'dotenv';
import colors from 'colors'
import  './db/db.js' 
import paymentRoutes from './routes/paymentRoutes.js'
import cardRouter from "./routes/cardRoutes.js";

const app = new express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));    
app.use(bodyParser.json());
dotenv.config();

//Payment Routes
app.use("/cardPay",paymentRoutes);


//Card Routes
app.use("/cards",cardRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {

     console.log(`SERVER IS UP AND RUNNING ON ${PORT}`.blue);  

})
