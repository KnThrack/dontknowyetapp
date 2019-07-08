// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

let jwt = require("express-jwt");

if (req.headers && req.headers.authorization) {
    var authorization = headers.authorization,
        decoded;
    try {
        decoded = jwt.verify(authorization, secret.secretToken);
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
    var userId = decoded.id;
    console.log(userId);

}

// Import recipes controller
var recipesController = require('./model/recipesController');
// Contact routes f
router.route('/recipes')
    .get(recipesController.index)
    .post(recipesController.new);
router.route('/recipes/:recipes_id')
    .get(recipesController.view)
    .patch(recipesController.update)
    .put(recipesController.update)
    .delete(recipesController.delete);

// Import users controller
var usersController = require('./model/userController');
// Users routes 
router.route('/users')
    .get(usersController.index)
    .post(usersController.new);
router.route('/users/:users_id')
    .get(usersController.view)
    .patch(usersController.update)
    .put(usersController.update)
    .delete(usersController.delete)
// Export API routes
module.exports = router;