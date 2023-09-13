const { Router } = require('express');
const route = Router();
  
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Authenticate user
 *     description: User will be authenticated with given info
*/
route.get('/users/auth', (req, res) => {
    res.send("User");
});
  
module.exports = route;