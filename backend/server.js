import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { initializeFirebase } from './firebase/firebaseAdmin.js';
import authRoute from "./routes/auth.route.js";
import adsRoute from "./routes/ads.route.js";
import adminRoute from "./routes/admin.rote.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

initializeFirebase();

app.get("/api", async(req, res)=>{
  res.json({message:"heelo world"});
})

app.use("/api/auth", authRoute);
app.use("/api/ads", adsRoute);
app.use("/api/admin", adminRoute);


const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
