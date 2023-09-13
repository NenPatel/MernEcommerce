import express from "express";
// import mongoose from "mongoose";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors"

dotenv.config({path:"./.env"})

connectDB()


const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)

app.get("/",(req,res) => {
    res.send("<h1>Welcome to Ecommerce App</h1>")
})

const PORT = process.env.PORT || 8000

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})
