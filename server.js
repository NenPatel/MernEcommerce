import express from "express";
// import mongoose from "mongoose";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";

dotenv.config({path:"./.env"})

connectDB()

const __filename = fileURLToPath(import.meta.url)  //  for dirname use beauce dirname is ES5
const __dirname = path.dirname(__filename)        //   and we are using ES6, for deployment

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,"./client/build")))

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)

app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

const PORT = process.env.PORT || 8080

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})
