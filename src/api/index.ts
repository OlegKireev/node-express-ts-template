import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { postsRouter } from '../routes';
import { DB_CONNECT, PORT } from '../constants';
import { colors } from '../utils';
import { errorHandler } from '../middlewares';

/** App */
const app = express();

app.listen(PORT, () => {
  console.log(colors.success(`[server]: started at http://localhost:${PORT}`));
});

app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

/** DB */
mongoose.set('strictQuery', false);
mongoose
  .connect(`${DB_CONNECT}`)
  .then(() => console.log(colors.success('[db]: Connected!')))
  .catch((err) => console.error(colors.error(`[db] Connecting error: ${err}`)));

/** Routes */
app.get('/', (req, res) => {
  res.send('Welcome to the node express ts template json api');
});
app.use(postsRouter);

/** Error handle middleware */
app.use(errorHandler);
