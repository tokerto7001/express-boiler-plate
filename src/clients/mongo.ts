import mongoose from "mongoose";
import { MONGODB_CONNECTION_URL } from "../config";

const connectToMongoDb = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(MONGODB_CONNECTION_URL!);
        if (connection.connections.length) console.log('Connected to MongoDb successfully');
    } catch (err) {
        console.log(err)
    }
}
export { connectToMongoDb }