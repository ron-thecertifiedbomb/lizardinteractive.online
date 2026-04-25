import mongoose from "mongoose";

// Using 127.0.0.1 instead of localhost prevents Node.js IPv6 resolution issues
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/my_database";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:");

    // Provide a specific hint if it's an ECONNREFUSED error
    if (error.message.includes("ECONNREFUSED")) {
      console.error(
        "-> Connection refused. Please verify that the MongoDB server is running and accessible on the specified host and port.",
      );
      console.error(`-> Attempted to connect to: ${MONGO_URI}`);
    } else {
      console.error(`-> ${error.message}`);
    }

    // Exit the Node process with a failure code
    process.exit(1);
  }
};

export default connectDB;
