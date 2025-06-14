

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import companyRoute from "./routes/company.route.js";

import connectDB from "./utils/db.js";
import UserRoute from "./routes/user.route.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5121"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5001;

// APIs
app.use("/api/users", UserRoute);
app.use("/api/company",companyRoute);

const MONGO_URI =  "mongodb+srv://aryan61865:ZccnMPPYg8mXXYFa@cluster0.r2gbu4q.mongodb.net/"
app.listen(PORT, async () => {
  await connectDB(); // Connect to MongoDB
  console.log(`🚀 Server is running on port ${PORT}`);

  // 👇 Drop pancard and adharcard indexes if they exist
  try {
    const collection = mongoose.connection.collection("users");
    const indexes = await collection.indexes();

    // Drop pancard_1 index if exists
    const pancardIndex = indexes.find(index => index.name === "pancard_1");
    if (pancardIndex) {
      await collection.dropIndex("pancard_1");
      console.log("✅ Dropped pancard_1 index");
    }

    // Drop adharcard_1 index if exists
    const adharIndex = indexes.find(index => index.name === "adharcard_1");
    if (adharIndex) {
      await collection.dropIndex("adharcard_1");
      console.log("✅ Dropped adharcard_1 index");
    }
  } catch (error) {
    console.error("❌ Error dropping indexes:", error.message);
  }
});
