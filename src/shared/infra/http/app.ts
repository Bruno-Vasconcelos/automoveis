import 'reflect-metadata';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { router as routes } from './routes';

const app = express();

app.use(express.json() as RequestHandler);

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
   
    console.error(err);

    return response
      .status(500)
      .json({ message: 'Internal server error', status: 500 });
  },
);

export { app };
