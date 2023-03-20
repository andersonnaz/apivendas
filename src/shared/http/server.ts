import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes/index';
import { AppError } from '@shared/errors/appError';
import { dataSource } from '../typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error!',
        });
    },
);

dataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.log('app running at port 3000');
    });
});
