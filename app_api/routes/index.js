var express = require('express');
var router = express.Router();
//for authentication
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
/******ADD CONTROLLERS HERE******/
// var ctrlName = require('../controllers/controllername')
var ctrlUsers = require('../controllers/users');
var ctrlAuth = require('../controllers/authentication');
var ctrlProducts = require('../controllers/products');
/******ADD API ROUTES HERE******/
// router.get('/route', ctrlName.method)

//Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//Users
router.get('/users', ctrlUsers.usersListAll);
router.post('/users', ctrlUsers.usersCreate);
router.get('/users/:userid', ctrlUsers.usersReadOne);
router.put('/users/:userid', ctrlUsers.usersUpdateOne);
router.delete('/users/:userid', ctrlUsers.usersDeleteOne);
router.post('/users/resetpassword',ctrlUsers.usersChangePass);

//Products
router.get('/products', ctrlProducts.productsList);
router.get('/products/:productid', ctrlProducts.productsReadOne);
router.post('/products', ctrlProducts.productsCreate);
router.put('/products/:productid', ctrlProducts.productsUpdateOne);
router.delete('/products/:productid', ctrlProducts.productsDeleteOne);


module.exports = router;