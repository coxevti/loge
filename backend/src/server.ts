import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import multerConfig from './configs/multer';
import './database';
import AppError from './errors/AppError';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/files', express.static(multerConfig.directoryUpload));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return res.status(500).json({
    status: 'fail',
    message: 'Internal server error',
  });
});

const port = process.env.SERVER_PORT || 3833;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀️ Server started on port ${port}`);
});
