import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/infra/typeorm';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import cors from 'cors';
import '@shared/container';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})


app.listen(3333, () => {
    console.log('Server is running!!')
})