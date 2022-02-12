import express from "express";
import dotenv from 'dotenv';
import connectDb from "./utils/dbConnect.js";
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express();

dotenv.config();
connectDb()
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)


app.listen(5000, () => {
   console.log('Listening on port 5000')
})