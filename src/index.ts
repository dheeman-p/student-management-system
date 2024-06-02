import express from 'express';
import mongoose from 'mongoose';
import { setupSwagger } from './swaggerConfig';
import { json } from 'body-parser';
import userRoutes from './routes/userRoutes';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env'})

const app = express();
const PORT = process.env.PORT || 3000;
app.use(json());
app.use('/users', userRoutes);

// Setup Swagger
setupSwagger(app);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

startServer();