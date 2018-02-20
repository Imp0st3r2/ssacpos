var express = require('express');
var router = express.Router();

var ctrlHome = require('../controllers/home');
var ctrlProducts = require('../controllers/products');
var ctrlUsers = require('../controllers/users');
var ctrlInvoices = require('../controllers/invoices');
var ctrlReports = require('../controllers/reports');

/* GET home page. */
router.get('/', ctrlHome.index);
router.get('/dashboard',ctrlHome.dashboard);

/*GET products home page*/
router.get('/products', ctrlProducts.index);
router.get('/products/create', ctrlProducts.create);
router.get('/products/brands', ctrlProducts.brands);
router.get('/products/categories', ctrlProducts.categories);
router.get('/products/brands/categories', ctrlProducts.categoriesByBrand);
router.get('/products/product/edit', ctrlProducts.edit);

/*GET invoices home page*/
router.get('/invoices', ctrlInvoices.index);

/*GET users home page*/
router.get('/users', ctrlUsers.index);

/*GET reports home page*/
router.get('/reports', ctrlReports.index);

module.exports = router;
