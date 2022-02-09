import express from "express";
import dotenv from 'dotenv';
import connectDb from "./utils/dbConnect.js";
import authRoutes from './routes/authRoutes.js'

const app = express();

dotenv.config();
connectDb()
app.use(express.json());

app.use('/api/auth', authRoutes)


app.listen(5000, () => {
   console.log('Listening on port 5000')
})