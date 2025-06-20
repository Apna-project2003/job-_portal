

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import companyRoute from "./routes/company.route.js";

import connectDB from "./utils/db.js";
import UserRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5001;

// APIs
app.use("/api/users", UserRoute);
app.use("/api/company",companyRoute);
app.use("/api/job",jobRoute);
app.use("/api/application",applicationRoute)
const MONGO_URI =  "mongodb+srv://aryan61865:ZccnMPPYg8mXXYFa@cluster0.r2gbu4q.mongodb.net/"
app.listen(PORT, async () => {
  await connectDB(); // Connect to MongoDB
  console.log(`🚀 Server is running on port ${PORT}`);

  // 👇 Drop pancard and adharcard indexes if they exist
  // try {
  //   const collection = mongoose.connection.collection("users");
  //   const indexes = await collection.indexes();

  //   // Drop pancard_1 index if exists
  //   const pancardIndex = indexes.find(index => index.name === "pancard_1");
  //   if (pancardIndex) {
  //     await collection.dropIndex("pancard_1");
  //     console.log("✅ Dropped pancard_1 index");
  //   }

  //   // Drop adharcard_1 index if exists
  //   const adharIndex = indexes.find(index => index.name === "adharcard_1");
  //   if (adharIndex) {
  //     await collection.dropIndex("adharcard_1");
  //     console.log("✅ Dropped adharcard_1 index");
  //   }
  // } catch (error) {
  //   console.error("❌ Error dropping indexes:", error.message);
  // }




  try {
  const collections = await mongoose.connection.db.listCollections().toArray();
  const collectionNames = collections.map((col) => col.name);

  if (collectionNames.includes("users")) {
    const collection = mongoose.connection.collection("users");
    const indexes = await collection.indexes();

    const pancardIndex = indexes.find((index) => index.name === "pancard_1");
    if (pancardIndex) {
      await collection.dropIndex("pancard_1");
      console.log("✅ Dropped pancard_1 index");
    }

    const adharIndex = indexes.find((index) => index.name === "adharcard_1");
    if (adharIndex) {
      await collection.dropIndex("adharcard_1");
      console.log("✅ Dropped adharcard_1 index");
    }
  } else {
    console.warn('⚠️ "users" collection does not exist. Skipping index drop.');
  }
} catch (error) {
  console.error("❌ Error dropping indexes:", error.message);
}

});
