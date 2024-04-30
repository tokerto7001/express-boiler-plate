// set listener for uncaught exceptions
process.on("uncaughtException", err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.stack);
    process.exit(1);
});
import dotenv from 'dotenv';
dotenv.config();
import app from './app';



// connect to mongodb
import { PORT } from './config';
// initiate the server
const server = app.listen(PORT, () => console.log(`Serves is awake on port ${PORT}`));

// set listener for unhandled rejections
process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(reason.name, reason.message, reason.stack);
    server.close(() => {
        process.exit(1);
    });
});