import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { currentUser } from './middlewares/current-user';
import { createSubcribetRouter } from './routes/new';
import { showsubcribeRouter } from './routes/show';
import { indexSubcribeRouter } from './routes/index';
import { updateSubcribeRouter } from './routes/update';
import { oneSubcribeRouter } from './routes/oneSubcribe';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);

app.use(createSubcribetRouter);
app.use(showsubcribeRouter);
app.use(indexSubcribeRouter);
app.use(updateSubcribeRouter);
app.use(oneSubcribeRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
