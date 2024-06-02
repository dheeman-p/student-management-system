import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API with Swagger',
      version: '1.0.0',
      description: 'A simple API documentation',
    },
    components: {}, // Ensure components are initialized
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Paths to files with OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};