import mongoose from "mongoose";

const connectToMongoDb = async (): Promise<void> => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_CONNECTION_URL!);
        if (connection.connections.length) console.log('Connected to MongoDb successfully');
    } catch (err) {
        console.log(err)
    }
}
export { connectToMongoDb }