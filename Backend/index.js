import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.routes.js";
import reportRoutes from "./routes/report.auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/userReport", reportRoutes);

const startServer = async () => {
  console.log("Connecting to db");
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server is running on Prot 4000");
    });
  } catch (error) {
    console.log("Error connecting to db");
  }
};

startServer();
