
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const productsRouter = require('./productsRouter');
const express = require('express');
const app = express();

app.use(authRouter)

app.use(userRouter)

app.use(productsRouter)

module.exports = app;