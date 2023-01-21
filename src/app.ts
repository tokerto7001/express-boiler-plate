import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import cookieParser from "cookie-parser"
import { AppError } from './utils/appError';
import { errorHandler } from './utils/errorHandler';
import { whiteList } from './config/whiteList';
import helmet from 'helmet';

const app: Application = express();


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(cors());
} else {
    // log more detailed info about the incoming request
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    // restrict the domains which can interact with this API
    app.use(cors(
        {
            origin: whiteList,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
        }
    ));
}
app.use(express.json({ limit: '10MB' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet())

app.use('/api/auth', authRoutes);

// For unmatching requests
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new AppError(`Can't find ${req.originalUrl}`, 404)
    next(error)
})

// Error handling middleware
app.use(errorHandler)

export default app;