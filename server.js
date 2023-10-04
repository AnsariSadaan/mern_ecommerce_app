import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import path from 'path'

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
//port
const PORT = process.env.PORT || 6969

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '../frontend/dist')))

//routes

app.use("/api/auth", authRoute)
app.use("/api/category", categoryRoutes)
app.use("/api/product", productRoutes)
//rest api

app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

//run listen
app.listen(PORT, ()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port no ${PORT}`.bgRed.white);
});
