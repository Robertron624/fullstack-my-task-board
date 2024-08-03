import mongoose from "mongoose";

const connectToMongoDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
      }

    const mongoDbUri = process.env.NEXT_PUBLIC_MONGODB_URI as string;

    try {
        await mongoose.connect(
            mongoDbUri,
            {
                connectTimeoutMS: 10000,
            }
        );
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};

export default connectToMongoDB;