(function(){
angular
	.module('ssacpos')
	.controller('dsreportslistCtrl', dsreportslistCtrl);

dsreportslistCtrl.$inject = ['$window','$location','$scope','$compile','dsreport', 'exportservice'];

function dsreportslistCtrl($window,$location,$scope,$compile,dsreport, exportservice) {
	var vm = this;
	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 2
	})
	dsreport.getListofDsReports().then(function(response){
		vm.dsreports = response.data;
		console.log(vm.dsreports);
		for(var i=0;i<vm.dsreports.length;i++){
			var creationdate = moment(vm.dsreports[i].creationdate).format("MM-DD-YYYY hh:mm A");
			console.log(creationdate);
			var startdate = vm.dsreports[i].startdate.split("T");
			var enddate = vm.dsreports[i].enddate.split("T");
			vm.dsreports[i].startdate = moment(startdate[0]).format("MM-DD-YYYY");
			vm.dsreports[i].enddate = moment(enddate[0]).format("MM-DD-YYYY");
			vm.dsreports[i].creationdate = creationdate;
			vm.dsreports[i].totalcash = formatter.format(vm.dsreports[i].totalcash);
			vm.dsreports[i].totalchecks = formatter.format(vm.dsreports[i].totalchecks);
			vm.dsreports[i].totalvisa = formatter.format(vm.dsreports[i].totalvisa);
			vm.dsreports[i].totalamex = formatter.format(vm.dsreports[i].totalamex);
			vm.dsreports[i].totaldiscover = formatter.format(vm.dsreports[i].totaldiscover);
			vm.dsreports[i].totalmastercard = formatter.format(vm.dsreports[i].totalmastercard);
			vm.dsreports[i].totalother = formatter.format(vm.dsreports[i].totalother);
			vm.dsreports[i].grandtotal = formatter.format(vm.dsreports[i].grandtotal);
			for(var j=0;j<vm.dsreports[i].invoices.length;j++){
				for(var k=0;k<vm.dsreports[i].invoices[j].payments.length;k++){
					vm.dsreports[i].invoices[j].payments[k].amountpaid = formatter.format(vm.dsreports[i].invoices[j].payments[k].amountpaid);
				}
				vm.dsreports[i].invoices[j].totalpayments = formatter.format(vm.dsreports[i].invoices[j].totalpayments);
				var invoicedate = vm.dsreports[i].invoices[j].datepaid.split("T");
				vm.dsreports[i].invoices[j].datepaid = moment(invoicedate[0]).format("MM-DD-YYYY");
			}
		}
	});
	vm.createDsReport = function() {
		$(".dsreports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><dsreportcreate></dsreportcreate></div>";
		var el = angular.element(stringToAppend)	
		$(".dsreports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.deleteDsReport = function(dsreportid) {
		vm.dsreport = {
			id : dsreportid
		}
		$(".dialogbox").empty();
		var appendString = "<div class='row'>"
						 +  "<div class='col-xs-12'>"
						 + 	 "<p>Are you sure you would like to delete this Report?</p>"
						 +	"</div>"
						 + "</div>"
						 + "<div class='row'>"
						 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='rvm.confirmDelete();'>Yes</button></div>"
						 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='rvm.cancel();'>No</button></div>"
						 + "</div>"; 
		var el = angular.element(appendString)
		$(".dialogbox").append(el);
		compiled = $compile(el);
		compiled($scope);
		$(".dialogbox").show();
	}
	vm.readOne = function(dsreportid){
		console.log(vm.dsreports);
		for (var i = 0; i < vm.dsreports.length; i++) {
			if(vm.dsreports[i]._id === dsreportid){
				vm.clickedDsReport = vm.dsreports[i];
				console.log(vm.clickedDsReport);
			}
		}
	}
	vm.editDsReport = function(dsreportid){
		vm.dsreport = {
			id : dsreportid
		}
		dsreport.setDsReport(vm.dsreport);
		$(".dsreports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><dsreportsedit></dsreportsedit></div>";
		var el = angular.element(stringToAppend)
		$(".dsreports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.confirmDelete = function(){
		dsreport.deleteDsReport(vm.dsreport.id).then(function(response){
			console.log(response);
			$(".dialogbox").hide();
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
		$(".dsreports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><dsreportslist></dsreportslist></div>";
		var el = angular.element(stringToAppend)
		$(".dsreports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.exportDsReports = function(){
		exportservice.exportCSV(vm.dsreports,"DsReports").then(function(response){
			console.log(response);
			$(".dialogbox").empty();
			var appendString = "<div class='row'>"
							 +  "<div class='col-xs-12'>"
							 + 	 "<p>" + response.data
							 +   "</p>"
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
	vm.cancel = function(){
		$(".dialogbox").hide();
	}
};
})();