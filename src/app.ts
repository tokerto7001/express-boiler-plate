import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import cookieParser from "cookie-parser"
import { AppError } from './utils/appError';
import { errorHandler } from './utils/errorHandler';

const app: Application = express();

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

// For unmatching requests
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new AppError(`Can't find ${req.originalUrl}`, 404)
    next(error)
})

// Error handling middleware
app.use(errorHandler)

export default app;