import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { postsRouter, userRouter, authRouter } from './routes';
import { DB_CONNECT, PORT } from './constants';
import { colors } from './utils';
import { checkAuth, errorHandler } from './middlewares';

/** App */
const app = express();

const bootstrap = async () => {
  try {
    await mongoose.connect(`${DB_CONNECT}`)
      .then(() => console.log(colors.success('[db]: Connected!')))
      .catch((err) => console.error(colors.error(`[db] Connecting error: ${err}`)));
    app.listen(PORT, () => {
      console.log(colors.success(`[server]: started at http://localhost:${PORT}`));
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      process.exit(1);
    }
  }
};

app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

/** DB */
mongoose.set('strictQuery', false);

app.use(checkAuth);

/** Routes */
app.get('/', (req, res) => {
  res.send('Welcome to the node express ts template json api');
});
app.use(postsRouter);
app.use(userRouter);
app.use(authRouter);

bootstrap();

/** Error handle middleware */
app.use(errorHandler);
