const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const outputFile = './api-doc.json';
const endpointsFiles = ['./*.js'];

const config = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Node test api",
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
    "security": [
      {
        "ApiTokenAuth": []
      }
    ],
    "securitySchemes": {
      "ApiTokenAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "x-auth-token",
        "description": "API token for authentication"
      }
    }
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
  console.log(`Api docs available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;