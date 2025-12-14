import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Please provide MONGODB_URL in the environment variables");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        dbName: "devflow",
      })
      .then((mongoose) => {
        console.log("Database Connected Successfully.");
        return mongoose;
      })
      .catch((error) => {
        console.error("Database Connection Error:", error);
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
