//lib
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const swaggerDocs = require("./utils/swagger");
const appRouters = require('./router/router');

//express 
const app = express()
const port = 3000

//set body parser
app.use(bodyParser.json())

//use body paeser
app.use(bodyParser.urlencoded({extended: true}))


mongoose
  .connect('mongodb://127.0.0.1:27017/node-tst')
  .then(() => {
    console.log('MongoDB Connected!')

    // loading routers
    app.use('/', appRouters);

    app.listen(port, () => {
      console.log(`node-test running at : ${port}.`)
    })

    swaggerDocs(app, port)

  }
  ).catch((error) => {
    console.log(error)
  });