import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );

    console.log(`MongoDB Connected :: ${connectionInstance.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Runtime Error ::", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB Disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB Reconnected");
    });
  } catch (error) {
    console.log(`MongoDB Connection Failed :: ${error}`);

    process.exit(1);
  }
};

export default connectDB;
