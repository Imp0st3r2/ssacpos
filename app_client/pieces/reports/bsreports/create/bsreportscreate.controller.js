(function(){
angular
	.module('ssacpos')
	.controller('bsreportsCreateCtrl', bsreportsCreateCtrl);

bsreportsCreateCtrl.$inject = ['$window','$location','$scope','$compile','bsreport','authentication','user','invoice'];

function bsreportsCreateCtrl($window,$location,$scope,$compile,bsreport,authentication,user,invoice) {
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
		vm.submitBsReport = function(){
			vm.bsreport = {
				creationdate : new Date().toISOString(),
				startdate : "",
				enddate : "",
				merchandisesales : 0,
				laborsales : 0,
				totalsales : 0,
				costofmerchandise : 0,
				costoflabor : 0,
				totalcost : 0,
				grossprofit : 0,
				numberofsales : 0,
				salestaxcollected : 0
			};
			var validInvoices = [];
			var startdate = new Date($("#report-startdate").val()).toISOString();
			console.log(startdate);
			vm.bsreport.startdate = startdate;
			var enddate = new Date($("#report-enddate").val()).toISOString();
			console.log(enddate);
			vm.bsreport.enddate = enddate;
			console.log("****BS REPORT***");
			console.log(vm.bsreport);
			for(var i=0;i<vm.invoices.length;i++){
				if(vm.invoices[i].datepaid >= startdate && vm.invoices[i].datepaid <= enddate){
					validInvoices.push(vm.invoices[i]);
				}
			}
			console.log("***Valid Invoices***");
			console.log(validInvoices);
			for(var i=0;i<validInvoices.length;i++){
				console.log(validInvoices[i]);
				for(var j=0;j<validInvoices[i].items.length;j++){
					vm.bsreport.merchandisesales += validInvoices[i].items[j].totalcharge;
					vm.bsreport.numberofsales += validInvoices[i].items[j].quantity;
					vm.bsreport.costofmerchandise += (validInvoices[i].items[j].unitcost * validInvoices[i].items[j].quantity);
				}
				for(var j=0;j<validInvoices[i].labors.length;j++){
					vm.bsreport.laborsales += validInvoices[i].labors[j].totalcharge;
					vm.bsreport.numberofsales++;
					vm.bsreport.costoflabor += validInvoices[i].labors[j].cost;
				}
				vm.bsreport.salestaxcollected += validInvoices[i].taxdue;
			}
			vm.bsreport.totalsales = vm.bsreport.merchandisesales + vm.bsreport.laborsales;
			vm.bsreport.totalcost = vm.bsreport.costofmerchandise + vm.bsreport.costoflabor;
			vm.bsreport.grossprofit = vm.bsreport.totalsales - vm.bsreport.totalcost;
			console.log(vm.bsreport);
			bsreport.createBsReport(vm.bsreport).then(function(response){
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
			$(".bsreports-container").empty();
			var stringToAppend = "<div class='col-xs-12'><bsreportslist></bsreportslist></div>";
			var el = angular.element(stringToAppend)
			$(".bsreports-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
	}else{
		$location.path('/home');
	}
};
})();