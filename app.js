const express = require('express')
const bodyParser = require('body-parser')
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/routes/user', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })


  const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Node test apis",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and Mongo",
      },
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
  

  app.listen(port, () => {
    console.log(`node-test running at : ${port}.`)
  })

