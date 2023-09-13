const { Router } = require('express');
const auth = require("../middleware/authenticator");
const userController = require("../controller/userController");

const route = Router();
  


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations for managing users
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
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           description: The email address of the user (must be unique).
 *         password:
 *           type: string
 *           description: The password of the user.
 *       required:
 *         - name
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       '204':
 *         description: User deleted successfully
 */

/**
 * @swagger
 * security:
 *   - ApiTokenAuth: []  # This specifies that an API token is required for all endpoints
 */


route.get('/users',auth,userController.get_user);

route.get('/users',auth,userController.get_user);

route.post('/users',auth,userController.create_user);

  
module.exports = route;