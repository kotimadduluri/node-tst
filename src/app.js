//lib

require("dotenv").config();

const express = require('express')
const bodyParser = require('body-parser')
const mongoDBConnector = require('./utils/mongoDB');
const swaggerDocs = require("./utils/swagger");
const logger = require("./middleware/logger");
const appRouters = require('./router/router');

//express 
const app = express()
const port = process.env.PORT || 3000

mongoDBConnector(
  () => {

    //set body parser
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
  
  
    // loading routers with loger
    //app.use('/',logger,appRouters);

    // loading routers with errors
    app.use('/api',appRouters);
  
    //swagger 
    swaggerDocs(app, port)
  
    app.listen(port, () => {
      console.log(`Server running at : ${process.env.PORT}.`)
    })
  
  }
)