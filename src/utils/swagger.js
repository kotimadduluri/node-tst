const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const outputFile = './api-doc.json';
const endpointsFiles = ['./*.js'];

const config = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "REST API Docs",
      version:"1.0.0",
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Test server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{
      bearerAuth: []
    },
    ],
  },
  apis: ["./src/router/*.js"],
};


const swaggerSpec = swaggerJsDoc(config);

function swaggerDocs(app, port) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get(outputFile, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Swagger Docs available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;