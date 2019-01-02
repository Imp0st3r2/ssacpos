(function(){
angular
	.module('ssacpos')
	.controller('ipreportslistCtrl', ipreportslistCtrl);

ipreportslistCtrl.$inject = ['$window','$location','$scope','$compile','ipreport', 'exportservice'];

function ipreportslistCtrl($window,$location,$scope,$compile,ipreport,exportservice) {
	var vm = this;
	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 2
	})
	ipreport.getListofIpReports().then(function(response){
		vm.ipreports = response.data;
		console.log(vm.ipreports);
		for(var i=0;i<vm.ipreports.length;i++){
			var creationdate = moment(vm.ipreports[i].creationdate).format("MM-DD-YYYY hh:mm A");
			console.log(creationdate);
			var startdate = vm.ipreports[i].startdate.split("T");
			var enddate = vm.ipreports[i].enddate.split("T");
			vm.ipreports[i].startdate = startdate[0];
			vm.ipreports[i].enddate = enddate[0];
			vm.ipreports[i].creationdate = creationdate;
			vm.ipreports[i].totalcost = formatter.format(vm.ipreports[i].totalcost);
			vm.ipreports[i].totalrate = formatter.format(vm.ipreports[i].totalrate);
			vm.ipreports[i].totalrecieved = formatter.format(vm.ipreports[i].totalrecieved);
			vm.ipreports[i].totalprofit = formatter.format(vm.ipreports[i].totalprofit);
			for(var j=0;j<vm.ipreports[i].installs.length;j++){
				console.log(vm.ipreports[i].installs[j]);
				var installdate = vm.ipreports[i].installs[j].installdate.split("T");
				vm.ipreports[i].installs[j].installdate = installdate[0];
				vm.ipreports[i].installs[j].cost = formatter.format(vm.ipreports[i].installs[j].cost);
				vm.ipreports[i].installs[j].totalcharge = formatter.format(vm.ipreports[i].installs[j].totalcharge);
				vm.ipreports[i].installs[j].hourlycharge = formatter.format(vm.ipreports[i].installs[j].hourlycharge);
				vm.ipreports[i].installs[j].profit = formatter.format(vm.ipreports[i].installs[j].profit);
			}
		}
	});
	vm.createIpReport = function() {
		$(".ipreports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><ipreportcreate></ipreportcreate></div>";
		var el = angular.element(stringToAppend)	
		$(".ipreports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.deleteIpReport = function(ipreportid) {
		vm.ipreport = {
			id : ipreportid
		}
		$(".dialogbox").empty();
		var appendString = "<div class='row'>"
						 +  "<div class='col-xs-12'>"
						 + 	 "<p>Are you sure you would like to delete this report?</p>"
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
	vm.readOne = function(ipreportid){
		console.log(vm.ipreports);
		for (var i = 0; i < vm.ipreports.length; i++) {
			if(vm.ipreports[i]._id === ipreportid){
				vm.clickedIpReport = vm.ipreports[i];
			}
		}
	}
	vm.editIpReport = function(ipreportid){
		vm.ipreport = {
			id : ipreportid
		}
		ipreport.setIpReport(vm.ipreport);
		$(".ipreports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><ipreportsedit></ipreportsedit></div>";
		var el = angular.element(stringToAppend)
		$(".ipreports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.confirmDelete = function(){
		ipreport.deleteIpReport(vm.ipreport.id).then(function(response){
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
		$(".ipreports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><ipreportslist></ipreportslist></div>";
		var el = angular.element(stringToAppend)
		$(".ipreports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.cancel = function(){
		$(".dialogbox").hide();
	}

	vm.exportIpReports = function(){
		exportservice.exportCSV(vm.ipreports,"IpReports").then(function(response){
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
	vm.printInvoice = function(){
		$window.open("/invoices/"+vm.clickedInvoice._id,"_blank");
	}
};
})();