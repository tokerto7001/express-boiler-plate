import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import cookieParser from "cookie-parser"

const app: Application = express();

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);




export default app;