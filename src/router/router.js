
const userRouter = require('./userRouter');
const productsRouter = require('./productsRouter');
const express = require('express');
const app = express();

app.use(userRouter)

app.use(productsRouter)

module.exports = app;