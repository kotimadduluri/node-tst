//lib
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const swaggerDocs = require("./utils/swagger");
const {validateProductRequest,validateProductId} = require("./middleware/validator");

//models
const Product = require('./models/productModel');


//express 
const app = express()
const port = 3000


//set body parser
app.use(bodyParser.json())

//use body paeser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)



//# APIS

// Routes
/**
 * @swagger
 * /products/{productId}:
 *  get:
 *    summury: Use to get product by it id
 *    parameters:
 *      - name: productId
 *        in: path
 *        description: id of the product
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '202':
 *        description: Successfully returns product
 *        content:
 *        application/json:
 * 
 */
app.get('/products/:productId', async (request, response) => {
  try {
    
    const errors = validateProductId(request)
    if (errors.length>0) {
      return response.status(400).json({ errors: errors });
    }

    const { productId } = request.params
    const product = await Product.findById(productId);
    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})

//to get all products

// Routes
/**
 * @swagger
 * /products:
 *  get:
 *    description: Use to get product by it id
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/products/', async (request, response) => {
  try {

    const errors = validateProductId(request)
    if (errors.length>0) {
      return response.status(400).json({ errors: errors });
    }

    const products = await Product.find({});
    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
})


//to save product
// Routes
/**
 * @swagger
 * /products:
 *  post:
 *    description: To create new product
 *    responses:
 *      '200':
 *        description: Returns new product
 */
app.post('/products/', async (request, response) => {

  try {

    const errors = validateProductRequest(request)
    if (errors.length>0) {
      return response.status(400).json({ errors: errors });
    }

    const product = await Product.create(request.body)
    response.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    response.status(500).json({ message: error.message })
  }
})

// Routes
/**
 * @swagger
 * /products/{productId}:
 *  put:
 *    summury: Use to updater product
 *    parameters:
 *      - name: productId
 *        in: path
 *        description: Enter product id here
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '202':
 *        description: Successfully delete the product
 * 
 */
app.put('/products/:productId', async (req, res) => {
  try {

    const errors = validateProductId(request)
    if (errors.length>0) {
      return response.status(400).json({ errors: errors });
    }

    const { productId } = req.params;    
    const body = req.body
    const product = await Product.findByIdAndUpdate(productId, body);

    if (!product) {  //if product not present throw error response
      return res.status(404).json({ message: `cannot find any product with ID ${productId}` })
    }

    //if we find prosuct and update it 
    const updatedProduct = await Product.findById(productId);
    res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// delete a product


// Routes
/**
 * @swagger
 * /products/{productId}:
 *  delete:
 *    summury: Use to delete product by it id
 *    parameters:
 *      - name: productId
 *        in: path
 *        description: Enter product id here
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '202':
 *        description: Successfully delete the product
 * 
 */

app.delete('/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (errors.length>0) {
      return res.status(404).json({ message: `cannot find any product with productId ${productId}` })
    }
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


mongoose
  .connect('mongodb://127.0.0.1:27017/node-tst')
  .then(() => {
    console.log('MongoDB Connected!')
    app.listen(port, () => {
      console.log(`node-test running at : ${port}.`)
    })

    swaggerDocs(app, port)

  }
  ).catch((error) => {
    console.log(error)
  });




