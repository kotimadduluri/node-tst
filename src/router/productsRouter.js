const { Router } = require('express');
const auth = require("../middleware/authenticator");
const productsController = require("../controller/productsController.js");

const route = Router();  
  
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API operations for managing products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product.
 *         quantity:
 *           type: integer
 *           format: int32
 *           description: The quantity of the product.
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product.
 *         image:
 *           type: string
 *           description: The image URL of the product.
 *       required:
 *         - name
 *         - quantity
 *         - price
 */


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiTokenAuth:
 *       type: apiKey
 *       in: header
 *       name: x-auth-token
 *       description: API token for authentication
 */


/**
 * @swagger
 * security:
 *   - ApiTokenAuth: []  # This specifies that an API token is required for all endpoints
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to retrieve
 *     responses:
 *       '200':
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Product created successfully
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Product updated successfully
 */

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to delete
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 */

/**
 * @swagger
 * security:
 *   - ApiTokenAuth: []  # This specifies that an API token is required for all endpoints
 */

//to get all products
route.get('/products',auth,productsController.get_products);

//to get product by id
route.get('/products/:productId',auth,productsController.get_products_by_id);

//to create
route.post('/products',auth,productsController.save_product);

//to update
route.put('/products/:productId',auth,productsController.update_product);

//to delete
route.delete('/products/:productId',auth,productsController.delete_product);



module.exports = route;