const { Router } = require('express');
const productsController = require("../controller/productsController");

const route = Router();  

//to et product by is id

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
route.get('/products/:productId',productsController.get_products_by_id);


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
route.get('/products',productsController.get_products);



//to save product
// Routes
/**
 * @swagger
 * /products:
 *  post:
 *    description: To create new product
 *    responses:
 *      '201':
 *        description: Returns new product
 */
route.post('/products',productsController.save_product);


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
route.put('/products/:productId',productsController.update_product);


//to delete

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
route.delete('/products/:productId',productsController.delete_product);



module.exports = route;