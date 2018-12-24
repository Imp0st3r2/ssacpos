(function(){
angular
	.module('ssacpos')
	.controller('tpreportsCreateCtrl', tpreportsCreateCtrl);

tpreportsCreateCtrl.$inject = ['$window','$location','$scope','$compile','tpreport','authentication','user','invoice'];

function tpreportsCreateCtrl($window,$location,$scope,$compile,tpreport,authentication,user,invoice) {
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
		vm.submitTpReport = function(){
			vm.tpreport = {
				creationdate : new Date().toISOString(),
				startdate : "",
				enddate : "",
				transactions : [],
				numberoftransactions : 0,
				totalitems : 0,
				totalcost : 0,
				totalrecieved : 0,
				totalprofit : 0,
				percgrossprofit : 0,
				totalspiffs : 0
			};
			var validInvoices = [];
			var startdate = new Date($("#report-startdate").val()).toISOString();
			console.log(startdate);
			vm.tpreport.startdate = startdate;
			var enddate = new Date($("#report-enddate").val()).toISOString();
			console.log(enddate);
			vm.tpreport.enddate = enddate;
			console.log("****TP REPORT***");
			console.log(vm.tpreport);
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
					var tdate = validInvoices[i].datepaid.split("T");
					tdate = tdate[0];
					console.log(tdate);
					var newTransaction = {
						brand : validInvoices[i].items[j].brand,
						category : validInvoices[i].items[j].category,
						model : validInvoices[i].items[j].model,
						quantity : validInvoices[i].items[j].quantity,
						spiffamount : validInvoices[i].items[j].spiffamount,
						totalcharge : validInvoices[i].items[j].totalcharge,
						unitcost : validInvoices[i].items[j].unitcost,
						unitprice : validInvoices[i].items[j].unitprice,
						date : tdate,
						salesrep : validInvoices[i].salesrep,
						invoicenumber : validInvoices[i].invoicenumber,
						customer : validInvoices[i].account.firstname + " " + validInvoices[i].account.lastname,
						profit: validInvoices[i].items[j].totalcharge - (validInvoices[i].items[j].unitcost * validInvoices[i].items[j].quantity),
						percgrossprofit : ((validInvoices[i].items[j].totalcharge - (validInvoices[i].items[j].unitcost * validInvoices[i].items[j].quantity)) / validInvoices[i].items[j].totalcharge) * 100,
						totalcost: validInvoices[i].items[j].unitcost * validInvoices[i].items[j].quantity,
						totalrecieved : validInvoices[i].items[j].totalcharge
					}
					vm.tpreport.transactions.push(newTransaction);
					vm.tpreport.numberoftransactions++;
					vm.tpreport.totalitems += validInvoices[i].items[j].quantity;
					vm.tpreport.totalcost += validInvoices[i].items[j].unitcost * validInvoices[i].items[j].quantity;
					vm.tpreport.totalrecieved += validInvoices[i].items[j].totalcharge;
					vm.tpreport.totalspiffs += validInvoices[i].items[j].spiffamount * validInvoices[i].items[j].quantity;
				}
			}
			vm.tpreport.totalprofit = vm.tpreport.totalrecieved - vm.tpreport.totalcost;
			vm.tpreport.percgrossprofit = (vm.tpreport.totalprofit / vm.tpreport.totalrecieved) * 100;
			console.log(vm.tpreport);
			tpreport.createTpReport(vm.tpreport).then(function(response){
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
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><tpreports></tpreports></div>";
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