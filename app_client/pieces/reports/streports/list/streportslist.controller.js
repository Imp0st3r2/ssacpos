(function(){
angular
	.module('ssacpos')
	.controller('streportslistCtrl', streportslistCtrl);

streportslistCtrl.$inject = ['$window','$location','$scope','$compile','streport', 'exportservice'];

function streportslistCtrl($window,$location,$scope,$compile,streport, exportservice) {
	var vm = this;
	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 2
	})
	streport.getListofStReports().then(function(response){
		vm.streports = response.data;
		console.log(vm.streports);
		for(var i=0;i<vm.streports.length;i++){
			var creationdate = moment(vm.streports[i].creationdate).format("MM-DD-YYYY hh:mm A");
		// 	console.log(creationdate);
			var startdate = vm.streports[i].startdate.split("T");
			var enddate = vm.streports[i].enddate.split("T");
			vm.streports[i].startdate = moment(startdate[0]).format("MM-DD-YYYY");
			vm.streports[i].enddate = moment(enddate[0]).format("MM-DD-YYYY");
			vm.streports[i].creationdate = creationdate;
		// 	for(var j=0;j<vm.tpreports[i].transactions.length;j++){
		// 		vm.tpreports[i].transactions[j].totalcost = formatter.format(vm.tpreports[i].transactions[j].totalcost);
		// 		vm.tpreports[i].transactions[j].totalrecieved = formatter.format(vm.tpreports[i].transactions[j].totalrecieved);
		// 		vm.tpreports[i].transactions[j].profit = formatter.format(vm.tpreports[i].transactions[j].profit);
		// 		vm.tpreports[i].transactions[j].spiffamount = formatter.format(vm.tpreports[i].transactions[j].spiffamount);
		// 		var tdate = vm.tpreports[i].transactions[j].date.split("T");
		// 		tdate = tdate[0];
		// 		vm.tpreports[i].transactions[j].date = moment(tdate).format("MM-DD-YYYY");
		// 	}
			vm.streports[i].totalsales = formatter.format(vm.streports[i].totalsales);
			vm.streports[i].taxablesales = formatter.format(vm.streports[i].taxablesales);
			vm.streports[i].tax = formatter.format(vm.streports[i].tax);
		// 	vm.tpreports[i].totalspiffs = formatter.format(vm.tpreports[i].totalspiffs);
		}
	});
	vm.createStReport = function() {
		$(".streports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><streportcreate></streportcreate></div>";
		var el = angular.element(stringToAppend)	
		$(".streports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.deleteStReport = function(streportid) {
		vm.streport = {
			id : streportid
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
	vm.readOne = function(streportid){
		console.log(vm.streports);
		for (var i = 0; i < vm.streports.length; i++) {
			if(vm.streports[i]._id === streportid){
				vm.clickedStReport = vm.streports[i];
				console.log(vm.clickedStReport);
			}
		}
	}
	vm.editStReport = function(streportid){
		vm.streport = {
			id : streportid
		}
		streport.setStReport(vm.streport);
		$(".streports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><streportsedit></streportsedit></div>";
		var el = angular.element(stringToAppend)
		$(".streports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.confirmDelete = function(){
		streport.deleteStReport(vm.streport.id).then(function(response){
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
		$(".streports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><streportslist></streportslist></div>";
		var el = angular.element(stringToAppend)
		$(".streports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.exportStReports = function(){
		exportservice.exportCSV(vm.streports,"StReports").then(function(response){
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