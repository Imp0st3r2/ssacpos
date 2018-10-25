(function(){
angular
	.module('ssacpos')
	.controller('ipreportsEditCtrl', ipreportsEditCtrl);

ipreportsEditCtrl.$inject = ['$window','$location','$scope','$compile','ipreport','authentication','user','invoice'];

function ipreportsEditCtrl($window,$location,$scope,$compile,ipreport,authentication,user,invoice) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.currentIpReport = ipreport.getIpReport();
		console.log(vm.currentIpReport);
		user.getUsers().then(function(response){
			vm.employees = response.data;
			invoice.getInvoiceList().then(function(response){
				vm.invoices = response.data;
			})
			ipreport.getIpReportById(vm.currentIpReport.id).then(function(response){
				vm.currentIpReport = response.data;
				console.log(vm.currentIpReport);
				$("#report-startdate").val(moment(vm.currentIpReport.startdate).format("MM/DD/YYYY"));
				$("#report-enddate").val(moment(vm.currentIpReport.enddate).format("MM/DD/YYYY"));
				$("#report-employee").val(vm.currentIpReport.employee);
			})
		})
		vm.submitIpReport = function(){
			vm.ipreport = {
				_id : vm.currentIpReport._id,
				creationdate : new Date().toISOString(),
				startdate : "",
				enddate : "",
				employee : "",
				installs : [],
				totalcost : 0,
				totalrecieved : 0,
				totalrate : 0,
				totalprofit : 0,
			};
			var validInvoices = [];
			var laborInvoiceNumbers = [];
			var validLabors = [];
			var startdate = new Date($("#report-startdate").val()).toISOString();
			console.log(startdate);
			vm.ipreport.startdate = startdate;
			var enddate = new Date($("#report-enddate").val()).toISOString();
			console.log(enddate);
			vm.ipreport.enddate = enddate;
			console.log("Ip Report With Creation, Start and End Dates, as well as Employee");
			console.log(vm.ipreport);
			vm.ipreport.employee = $("#report-employee").val();
			for(var i=0;i<vm.invoices.length;i++){
				if(vm.invoices[i].datepaid >= startdate && vm.invoices[i].datepaid <= enddate && vm.invoices[i].labors.length > 0){
					validInvoices.push(vm.invoices[i]);
				}
			}
			console.log("***Valid Invoices***");
			console.log(validInvoices);
			for(var i=0;i<validInvoices.length;i++){
				for(var j=0;j<validInvoices[i].labors.length;j++){
					if(validInvoices[i].labors[j].installer === vm.ipreport.employee){
						laborInvoiceNumbers.push(validInvoices[i].invoicenumber);
						validInvoices[i].labors[j].invoicenumber = validInvoices[i].invoicenumber;
						validInvoices[i].labors[j].installdate = new Date(validInvoices[i].datepaid).toISOString();
						validInvoices[i].labors[j].profit = validInvoices[i].labors[j].totalcharge - validInvoices[i].labors[j].cost;
						validLabors.push(validInvoices[i].labors[j]);
						vm.ipreport.totalcost += validInvoices[i].labors[j].cost;
						vm.ipreport.totalrecieved += validInvoices[i].labors[j].totalcharge;
						vm.ipreport.totalrate += validInvoices[i].labors[j].hourlycharge;

					}
				}
			}
			console.log(laborInvoiceNumbers);
			console.log(validLabors);
			vm.ipreport.installs = validLabors;
			vm.ipreport.totalprofit = vm.ipreport.totalrecieved - vm.ipreport.totalcost;
			console.log(vm.ipreport);
			ipreport.editIpReport(vm.ipreport).then(function(response){
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
			var stringToAppend = "<div class='col-xs-12 piece'><ipreports></ipreports></div>";
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