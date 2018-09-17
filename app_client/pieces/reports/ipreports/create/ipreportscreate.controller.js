(function(){
angular
	.module('ssacpos')
	.controller('ipreportsCreateCtrl', ipreportsCreateCtrl);

ipreportsCreateCtrl.$inject = ['$window','$location','$scope','$compile','ipreport','authentication','user','invoice'];

function ipreportsCreateCtrl($window,$location,$scope,$compile,ipreport,authentication,user,invoice) {
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
		vm.submitSppReport = function(){
			vm.sppreport = {
				creationdate : new Date(),
				startdate : "",
				enddate : "",
				employee : "",
				items : [],
				totalitems : 0,
				totalitemcost : 0,
				totalitemprice : 0,
				percgp : 0,
				totalprofit : 0,
				totalspiffs : 0
			};
			var validinvoices = [];
			var startdate = new Date($("#report-startdate").val()).toISOString();
			console.log(startdate);
			vm.sppreport.startdate = startdate;
			var enddate = new Date($("#report-enddate").val()).toISOString();
			console.log(enddate);
			vm.sppreport.enddate = enddate;
			console.log(vm.sppreport);
			vm.sppreport.employee = $("#report-employee").val();
			for(var i=0;i<vm.invoices.length;i++){
				if(vm.invoices[i].datepaid >= startdate && vm.invoices[i].datepaid <= enddate){
					validinvoices.push(vm.invoices[i]);
				}
			}
			console.log(validinvoices);
			for(var i=0;i<validinvoices.length;i++){
				for(var j=0;j<validinvoices[i].items.length;j++){
					vm.sppreport.items.push(validinvoices[i].items[j]);
					vm.sppreport.totalitems++;
					console.log(validinvoices[i].items[j].totalcharge);
					if(validinvoices[i].items[j].totalcharge){
						vm.sppreport.totalitemprice += validinvoices[i].items[j].totalcharge;
						console.log(vm.sppreport.totalitemprice);
					}
				}
				for(var j=0;j<validinvoices[i].spiffs.length;j++){
					if(validinvoices[i].spiffs[j].amount){
						vm.sppreport.totalspiffs += validinvoices[i].spiffs[j].amount;
					}
				}
				if(validinvoices[i].totalcost){
					vm.sppreport.totalitemcost += validinvoices[i].totalcost;
				}
			}
			vm.sppreport.totalprofit = vm.sppreport.totalitemprice - vm.sppreport.totalitemcost;
			vm.sppreport.percgp = (vm.sppreport.totalprofit / vm.sppreport.totalitemprice) * 100;

			console.log(vm.sppreport);
			sppreport.createSppReport(vm.sppreport).then(function(response){
				console.log(response);
				$(".dialogbox").empty();
				var appendString = "<div class='row'>"
								 +  "<div class='col-xs-12'>"
								 + 	 "<p>"+response.data+"</p>"
								 +	"</div>"
								 + "</div>"
								 + "<div class='row'>"
								 +	"<div class='col-xs-3'></div>"
								 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='rvm.showList();'>OK</button></div>"
								 +	"<div class='col-xs-3'></div>"; 
				var el = angular.element(appendString)
				$(".dialogbox").append(el);
				compiled = $compile(el);
				compiled($scope);
				$(".dialogbox").show();
			})
		}

		vm.showList = function(){
			$(".dialogbox").hide();
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><sppreports></sppreports></div>";
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