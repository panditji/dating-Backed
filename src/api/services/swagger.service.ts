import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const port = process.env.PORT || '3001';

const components = {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  responses: {
    success200: {
      message: 'ok',
      description: 'success'
    }
  },
  parameters: {
    langQueryParam: {
      name: "lang",
      in: "query",
      description: "query params to set lang",
      required: false
    }
  }

};

const swaggerService = () => {
  const url = `${__dirname}/../routes/**/*{.js,.ts}`;
  const swaggerDefinition = {
    components,
    openapi: '3.0.2',
    info: {
      title: 'Rostr',
      version: '0.1',
      description: 'Rostr server',
    },
    basePath: '/',
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local API'
      },
      {
        url: `http://ok2.staging.Rostr.com.au/api`,
        description: 'Staging API'
      }
    ],
  };

  // options for the swagger docs
  const options = {
    swaggerDefinition,
    apis: [url],
  };
  const specs = swaggerJsdoc(options);
  return {
    specs,
    swaggerUi,
  };
};

export default swaggerService;
