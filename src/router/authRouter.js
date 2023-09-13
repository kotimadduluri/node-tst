const { Router } = require('express');
const authController = require("../controller/authController");

const route = Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate user with id and password
*/
route.post("/", authController.post_authenticate);

module.exports = route;