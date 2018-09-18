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
var ctrlSppReports = require('../controllers/sppreports');
var ctrlIpReports = require('../controllers/ipreports');
var ctrlBsReports = require('../controllers/bsreports');
var ctrlDsReports = require('../controllers/dsreports');
var ctrlTpReports = require('../controllers/tpreports');
var ctrlStReports = require('../controllers/streports');
var ctrlAccounts = require('../controllers/accounts');
var ctrlSpiffs = require('../controllers/spiffs');
var ctrlLabors = require('../controllers/labors');

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
router.get('/products/model/:modelname', ctrlProducts.productsByModel);
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

//SppReports
router.get('/sppreports', ctrlSppReports.GetListofSppReports);
router.get('/sppreports/:reportid', ctrlSppReports.GetSppReportById);
router.post('/sppreports', ctrlSppReports.CreateSppReport);
router.put('/sppreports/:reportid', ctrlSppReports.UpdateSppReport);
router.delete('/sppreports/:reportid', ctrlSppReports.DeleteSppReport);

//IpReports
router.get('/ipreports', ctrlIpReports.GetListofIpReports);
router.get('/ipreports/:reportid', ctrlIpReports.GetIpReportById);
router.post('/ipreports', ctrlIpReports.CreateIpReport);
router.put('/ipreports/:reportid', ctrlIpReports.UpdateIpReport);
router.delete('/ipreports/:reportid', ctrlIpReports.DeleteIpReport);

//BsReports
router.get('/bsreports', ctrlBsReports.GetListofBsReports);
router.get('/bsreports/:reportid', ctrlBsReports.GetBsReportById);
router.post('/bsreports', ctrlBsReports.CreateBsReport);
router.put('/bsreports/:reportid', ctrlBsReports.UpdateBsReport);
router.delete('/bsreports/:reportid', ctrlBsReports.DeleteBsReport);

//DsReports
router.get('/dsreports', ctrlDsReports.GetListofDsReports);
router.get('/dsreports/:reportid', ctrlDsReports.GetDsReportById);
router.post('/dsreports', ctrlDsReports.CreateDsReport);
router.put('/dsreports/:reportid', ctrlDsReports.UpdateDsReport);
router.delete('/dsreports/:reportid', ctrlDsReports.DeleteDsReport);

//TpReports
router.get('/tpreports', ctrlTpReports.GetListofTpReports);
router.get('/tpreports/:reportid', ctrlTpReports.GetTpReportById);
router.post('/tpreports', ctrlTpReports.CreateTpReport);
router.put('/tpreports/:reportid', ctrlTpReports.UpdateTpReport);
router.delete('/tpreports/:reportid', ctrlTpReports.DeleteTpReport);

//StReports
router.get('/streports', ctrlStReports.GetListofStReports);
router.get('/streports/:reportid', ctrlStReports.GetStReportById);
router.post('/streports', ctrlStReports.CreateStReport);
router.put('/streports/:reportid', ctrlStReports.UpdateStReport);
router.delete('/streports/:reportid', ctrlStReports.DeleteStReport);

//Accounts
router.get('/accounts', ctrlAccounts.accountsList);
router.get('/accounts/:accountid', ctrlAccounts.accountsReadOne);
router.post('/accounts', ctrlAccounts.accountsCreate);
router.put('/accounts/:accountid', ctrlAccounts.accountsUpdateOne);
router.delete('/accounts/:accountid', ctrlAccounts.accountsDeleteOne);

//Spiffs
router.get('/spiffs', ctrlSpiffs.spiffsList);
router.get('/spiffs/:spiffid', ctrlSpiffs.spiffsReadOne);
router.post('/spiffs', ctrlSpiffs.spiffsCreate);
router.put('/spiffs/:spiffid', ctrlSpiffs.spiffsUpdateOne);
router.delete('/spiffs/:spiffid', ctrlSpiffs.spiffsDeleteOne);

//Labors
router.get('/labors',ctrlLabors.laborsList);
router.get('/labors/:laborid', ctrlLabors.laborsReadOne);
router.post('/labors', ctrlLabors.laborsCreate);
router.put('/labors/:laborid', ctrlLabors.laborsUpdateOne);
router.delete('/labors/:laborid', ctrlLabors.laborsDeleteOne);

//Tax
router.get('/taxrate', ctrlTaxes.getTaxRate);

module.exports = router;