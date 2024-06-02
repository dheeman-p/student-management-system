import express from 'express';
import { json } from 'body-parser';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(json());
app.use('/users', userRoutes);

export default app;