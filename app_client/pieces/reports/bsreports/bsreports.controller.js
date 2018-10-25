(function(){
angular
	.module('ssacpos')
	.controller('bsreportsCtrl', bsreportsCtrl);

bsreportsCtrl.$inject = ['$window','$location','$scope','$compile','bsreport'];

function bsreportsCtrl($window,$location,$scope,$compile,bsreport) {
	var vm = this;
	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 2
	})
	bsreport.getListofBsReports().then(function(response){
		vm.bsreports = response.data;
		console.log(vm.bsreports);
		for(var i=0;i<vm.bsreports.length;i++){
			var creationdate = moment(vm.bsreports[i].creationdate).format("MM-DD-YYYY hh:mm A");
			console.log(creationdate);
			var startdate = vm.bsreports[i].startdate.split("T");
			var enddate = vm.bsreports[i].enddate.split("T");
			vm.bsreports[i].startdate = moment(startdate[0]).format("MM-DD-YYYY");
			vm.bsreports[i].enddate = moment(enddate[0]).format("MM-DD-YYYY");
			vm.bsreports[i].creationdate = creationdate;
			vm.bsreports[i].costoflabor = formatter.format(vm.bsreports[i].costoflabor);
			vm.bsreports[i].costofmerchandise = formatter.format(vm.bsreports[i].costofmerchandise);
			vm.bsreports[i].grossprofit = formatter.format(vm.bsreports[i].grossprofit);
			vm.bsreports[i].laborsales = formatter.format(vm.bsreports[i].laborsales);
			vm.bsreports[i].merchandisesales = formatter.format(vm.bsreports[i].merchandisesales);
			vm.bsreports[i].salestaxcollected = formatter.format(vm.bsreports[i].salestaxcollected);
			vm.bsreports[i].totalcost = formatter.format(vm.bsreports[i].totalcost);
			vm.bsreports[i].totalsales = formatter.format(vm.bsreports[i].totalsales);
		}
	});
	vm.createBsReport = function() {
		$(".data-container").empty();
		var stringToAppend = "<div class='col-xs-12 piece'><bsreportcreate></bsreportcreate></div>";
		var el = angular.element(stringToAppend)	
		$(".data-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.deleteBsReport = function(bsreportid) {
		vm.bsreport = {
			id : bsreportid
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
	vm.readOne = function(bsreportid){
		console.log(vm.bsreports);
		for (var i = 0; i < vm.bsreports.length; i++) {
			if(vm.bsreports[i]._id === bsreportid){
				vm.clickedBsReport = vm.bsreports[i];
				console.log(vm.clickedBsReport);
			}
		}
	}
	vm.editBsReport = function(bsreportid){
		vm.bsreport = {
			id : bsreportid
		}
		bsreport.setBsReport(vm.bsreport);
		$(".data-container").empty();
		var stringToAppend = "<div class='col-xs-12 piece'><bsreportsedit></bsreportsedit></div>";
		var el = angular.element(stringToAppend)
		$(".data-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.confirmDelete = function(){
		bsreport.deleteBsReport(vm.bsreport.id).then(function(response){
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
		$(".data-container").empty();
		var stringToAppend = "<div class='col-xs-12 piece'><bsreports></bsreports></div>";
		var el = angular.element(stringToAppend)
		$(".data-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.cancel = function(){
		$(".dialogbox").hide();
	}
};
})();