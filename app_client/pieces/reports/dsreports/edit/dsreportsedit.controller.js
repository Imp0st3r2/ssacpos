(function(){
angular
	.module('ssacpos')
	.controller('dsreportsEditCtrl', dsreportsEditCtrl);

dsreportsEditCtrl.$inject = ['$window','$location','$scope','$compile','dsreport','authentication','user','invoice'];

function dsreportsEditCtrl($window,$location,$scope,$compile,dsreport,authentication,user,invoice) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.currentDsReport = dsreport.getDsReport();
		user.getUsers().then(function(response){
			vm.employees = response.data;
			invoice.getInvoiceList().then(function(response){
				vm.invoices = response.data;
			})
			dsreport.getDsReportById(vm.currentDsReport.id).then(function(response){
				vm.currentDsReport = response.data;
				console.log(vm.currentDsReport);
				$("#report-startdate").val(moment(vm.currentDsReport.startdate).format("MM/DD/YYYY"));
				$("#report-enddate").val(moment(vm.currentDsReport.enddate).format("MM/DD/YYYY"));
			})
		})
		vm.submitDsReport = function(){
			vm.dsreport = {
				_id : vm.currentDsReport._id,
				creationdate : new Date().toISOString(),
				startdate : "",
				enddate : "",
				invoices : [],
				totalcash : 0,
				totalchecks : 0,
				totalvisa : 0,
				totalamex : 0,
				totalmastercard : 0,
				totaldiscover : 0,
				totalother : 0,
				grandtotal : 0
			};
			var validInvoices = [];
			var startdate = new Date($("#report-startdate").val()).toISOString();
			console.log(startdate);
			vm.dsreport.startdate = startdate;
			var enddate = new Date($("#report-enddate").val()).toISOString();
			console.log(enddate);
			vm.dsreport.enddate = enddate;
			console.log("****DS REPORT***");
			console.log(vm.dsreport);
			for(var i=0;i<vm.invoices.length;i++){
				if(vm.invoices[i].datepaid >= startdate && vm.invoices[i].datepaid <= enddate){
					validInvoices.push(vm.invoices[i]);
				}
			}
			console.log("***Valid Invoices***");
			console.log(validInvoices);
			for(var i=0;i<validInvoices.length;i++){
				var currentInvoice = {
					datepaid : validInvoices[i].datepaid,
					employee : validInvoices[i].salesrep,
					invoice : validInvoices[i].invoicenumber,
					customer : validInvoices[i].account.firstname + " " + validInvoices[i].account.lastname,
					payments : [],
					totalpayments : 0
				}
				for(var j=0;j<validInvoices[i].payments.length;j++){
					var payment = {
						amountpaid : validInvoices[i].payments[j].amountpaid,
						dateofpayment : validInvoices[i].payments[j].dateofpayment,
						paymenttype : validInvoices[i].payments[j].paymenttype
					}
					currentInvoice.payments.push(payment);
				}
				for(var j=0;j<currentInvoice.payments.length;j++){
					currentInvoice.totalpayments += currentInvoice.payments[j].amountpaid;
					switch(currentInvoice.payments[j].paymenttype){
						case "Cash":
							vm.dsreport.totalcash += currentInvoice.payments[j].amountpaid;
							break;
						case "Check":
							vm.dsreport.totalchecks += currentInvoice.payments[j].amountpaid;
							break;
						case "Visa":
							vm.dsreport.totalvisa += currentInvoice.payments[j].amountpaid;
							break;
						case "Amex":
							vm.dsreport.totalamex += currentInvoice.payments[j].amountpaid;
							break;
						case "Mastercard":
							vm.dsreport.totalmastercard += currentInvoice.payments[j].amountpaid;
							break;
						case "Discover":
							vm.dsreport.totaldiscover += currentInvoice.payments[j].amountpaid;
							break;
						case "Other":
							vm.dsreport.totalother += currentInvoice.payments[j].amountpaid;
							break;
						default:
							console.log("payment type doesn't exist");
							break;
					}
					vm.dsreport.grandtotal += currentInvoice.payments[j].amountpaid;
				}
				vm.dsreport.invoices.push(currentInvoice);
			}
			console.log(vm.dsreport);
			dsreport.editDsReport(vm.dsreport).then(function(response){
				console.log(response);
				$(".dialogbox").empty();
				var appendString = "<div class='row'>"
								 + 	"<div class='col-xs-12'>"
								 +		"<p>" +response.data+"</p>"
								 +	"</div>"
								 + "</div>"
								 + "<div class='row'>"
								 +	"<div class='col-xs-3'></div>"
								 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='rvm.showList();'>OK</button></div>"
								 +	"<div class='col-xs-3'></div>";
				var el = angular.element(appendString);
				$(".dialogbox").append(el);
				compiled = $compile(el);
				compiled($scope);
				$(".dialogbox").show();
			})
		}

		vm.showList = function(){
			$(".dialogbox").hide();
			$(".dsreports-container").empty();
			var stringToAppend = "<div class='col-xs-12'><dsreportslist></dsreportslist></div>";
			var el = angular.element(stringToAppend)
			$(".dsreports-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
	}else{
		$location.path('/home');
	}
};
})();