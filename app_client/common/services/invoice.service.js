(function () {
	angular
		.module('ssacpos')
		.service('invoice', invoice);

	invoice.$inject = ['$window','$http'];
	function invoice ($window,$http) {
		var currentInvoice = {};
		var getInvoiceList = function(){
			return $http.get('/api/invoices');
		};
		var getInvoiceById = function(invoiceid){
			return $http.get('/api/invoices/'+invoiceid);
		};
		var createInvoice = function(cinvoice){
			return $http.post('/api/invoices',cinvoice);
		};
		var editInvoice = function(cinvoice){
			return $http.put('/api/invoices/'+cinvoice._id,cinvoice);
		};
		var deleteInvoice = function(invoiceid){
			return $http.delete('/api/invoices/'+invoiceid);
		};
		var setInvoice = function(cinvoice){
			currentInvoice = cinvoice;
		};
		var getInvoice = function(){
			return currentInvoice;
		};
		var makePayment = function(invoiceid, payment){
			return $http.post('/api/invoices/'+invoiceid+'/makepayment',payment);
		}
		var markedPaid = function(invoiceid){
			return $http.post('/api/invoices/'+invoiceid+'/markedpaid');
		}
		return {
			getInvoiceList : getInvoiceList,
			getInvoiceById : getInvoiceById,
			createInvoice : createInvoice,
			editInvoice : editInvoice,
			deleteInvoice : deleteInvoice,
			setInvoice : setInvoice,
			getInvoice : getInvoice,
			makePayment : makePayment,
			markedPaid : markedPaid
		};
	}
}) ();