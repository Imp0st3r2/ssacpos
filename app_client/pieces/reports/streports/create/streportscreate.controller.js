(function(){
angular
	.module('ssacpos')
	.controller('streportsCreateCtrl', streportsCreateCtrl);

streportsCreateCtrl.$inject = ['$window','$location','$scope','$compile','streport','authentication','user','invoice','tax'];

function streportsCreateCtrl($window,$location,$scope,$compile,streport,authentication,user,invoice,tax) {
	console.log("test");
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.employees = [];
		user.getUsers().then(function(response){
			vm.employees = response.data;
			console.log(vm.employees);
		})
		invoice.getInvoiceList().then(function(response){
			console.log(response.data);
			vm.invoices = response.data;
		})
		vm.submitStReport = function(){
			vm.streport = {
				creationdate : new Date().toISOString(),
				startdate : "",
				enddate : "",
				state: "WA",
				taxtype : "Sales Tax",
				taxrate : 0,
				totalsales : 0,
				taxablesales : 0,
				tax : 0
			};
			var validInvoices = [];
			var startdate = new Date($("#report-startdate").val()).toISOString();
			console.log(startdate);
			vm.streport.startdate = startdate;
			var enddate = new Date($("#report-enddate").val()).toISOString();
			console.log(enddate);
			vm.streport.enddate = enddate;
			console.log("****ST REPORT***");
			console.log(vm.streport);
			for(var i=0;i<vm.invoices.length;i++){
				if(vm.invoices[i].datepaid >= startdate && vm.invoices[i].datepaid <= enddate){
					validInvoices.push(vm.invoices[i]);
				}
			}
			console.log("***Valid Invoices***");
			console.log(validInvoices);
			for(var i=0;i<validInvoices.length;i++){
				console.log(validInvoices[i]);
				vm.streport.totalsales += validInvoices[i].itemcharges + validInvoices[i].othercharges;
				if(validInvoices[i].account.taxexempt === false){
					vm.streport.taxablesales += validInvoices[i].itemcharges + validInvoices[i].othercharges;
				}
			}
			tax.getTaxRate().then(function(response){
				vm.streport.taxrate = response.data;
				vm.streport.tax = vm.streport.taxablesales * vm.streport.taxrate;
				console.log(vm.streport);
				streport.createStReport(vm.streport).then(function(response){
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
			})
		}

		vm.showList = function(){
			$(".dialogbox").hide();
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><streports></streports></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
	}else{
		$location.path('/home');
	}
};
})();