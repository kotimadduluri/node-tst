const { Router } = require('express');
const auth = require("../middleware/authenticator");
const userController = require("../controller/userController");

const route = Router();
  
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Authenticate user
 *     description: User will be authenticated with given info
*/
route.get('/users',auth,userController.get_user);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user
 *     description: User will create new user if all given details matching the requirements
*/
route.post('/users',auth,userController.create_user);

  
module.exports = route;