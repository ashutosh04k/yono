import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import appRoutes from "./routes/App.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"));

app.use("/api/apps", appRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});