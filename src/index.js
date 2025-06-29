// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import spamRoute from "./routes/spam.js";
import spearchRoute from "./routes/search.js";
import userRoute from "./routes/user.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// To parse JSON request bodies

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"] || [
      "https://bc15-152-59-204-148.ngrok-free.app",
    ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/spam", spamRoute);
app.use("/api/search", spearchRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.json({
    msg: "Hello! I am mahitha and welcome to my truecaller clone backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
