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
var ctrlInvoices = require('../controllers/invoices');
var ctrlTaxes = require('../controllers/taxes');
var ctrlReports = require('../controllers/reports');
var ctrlAccounts = require('../controllers/accounts');
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
router.get('/products/categories/:brand', ctrlProducts.getCategoriesByBrand);

//Invoices
router.get('/invoices', ctrlInvoices.invoicesList);
router.get('/invoices/:invoiceid', ctrlInvoices.invoicesReadOne);
router.post('/invoices', ctrlInvoices.invoicesCreate);
router.put('/invoices/:invoiceid', ctrlInvoices.invoicesUpdateOne);
router.delete('/invoices/:invoiceid', ctrlInvoices.invoicesDeleteOne);
router.post('/invoices/:invoiceid/makepayment', ctrlInvoices.invoicesMakePayment);
router.post('/invoices/:invoiceid/markedpaid', ctrlInvoices.invoicesMarkedPaid);
// router.post('/invoices/report', ctrlInvoices.invoicesByDateRange);

//Reports
router.get('/reports', ctrlReports.reportsList);

//Accounts
router.get('/accounts', ctrlAccounts.accountsList);
router.get('/accounts/:accountid', ctrlAccounts.accountsReadOne);
router.post('/accounts', ctrlAccounts.accountsCreate);
router.put('/accounts/:accountid', ctrlAccounts.accountsUpdateOne);
router.delete('/accounts/:accountid', ctrlAccounts.accountsDeleteOne);

//Tax
router.get('/taxrate', ctrlTaxes.getTaxRate);

module.exports = router;