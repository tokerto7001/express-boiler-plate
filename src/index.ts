// set listener for uncaught exceptions
process.on("uncaughtException", err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.stack);
    process.exit(1);
});

import app from './app';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

// connect to mongodb
import { connectToMongoDb } from './clients/mongo';
connectToMongoDb();

// initiate the server
const server = app.listen(process.env.PORT, () => console.log(`Serves is awake on port ${process.env.PORT}`));

// set listener for unhandled rejections
process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(reason.name, reason.message, reason.stack);
    server.close(() => {
        process.exit(1);
    });
});