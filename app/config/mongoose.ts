import mongoose from "mongoose";

const connectToMongoDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("Already connected to MongoDB");
        return;
    }

    const mongoDbUri = process.env.NEXT_PUBLIC_MONGODB_URI as string;

    if (!mongoDbUri) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

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