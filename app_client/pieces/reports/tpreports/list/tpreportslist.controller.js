(function(){
angular
	.module('ssacpos')
	.controller('tpreportslistCtrl', tpreportslistCtrl);

tpreportslistCtrl.$inject = ['$window','$location','$scope','$compile','tpreport','exportservice'];

function tpreportslistCtrl($window,$location,$scope,$compile,tpreport,exportservice) {
	var vm = this;
	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 2
	})
	tpreport.getListofTpReports().then(function(response){
		vm.tpreports = response.data;
		console.log(vm.tpreports);
		for(var i=0;i<vm.tpreports.length;i++){
			var creationdate = moment(vm.tpreports[i].creationdate).format("MM-DD-YYYY hh:mm A");
			console.log(creationdate);
			var startdate = vm.tpreports[i].startdate.split("T");
			var enddate = vm.tpreports[i].enddate.split("T");
			vm.tpreports[i].startdate = moment(startdate[0]).format("MM-DD-YYYY");
			vm.tpreports[i].enddate = moment(enddate[0]).format("MM-DD-YYYY");
			vm.tpreports[i].creationdate = creationdate;
			for(var j=0;j<vm.tpreports[i].transactions.length;j++){
				vm.tpreports[i].transactions[j].totalcost = formatter.format(vm.tpreports[i].transactions[j].totalcost);
				vm.tpreports[i].transactions[j].totalrecieved = formatter.format(vm.tpreports[i].transactions[j].totalrecieved);
				vm.tpreports[i].transactions[j].profit = formatter.format(vm.tpreports[i].transactions[j].profit);
				vm.tpreports[i].transactions[j].spiffamount = formatter.format(vm.tpreports[i].transactions[j].spiffamount);
				var tdate = vm.tpreports[i].transactions[j].date.split("T");
				tdate = tdate[0];
				vm.tpreports[i].transactions[j].date = moment(tdate).format("MM-DD-YYYY");
			}
			vm.tpreports[i].totalcost = formatter.format(vm.tpreports[i].totalcost);
			vm.tpreports[i].totalrecieved = formatter.format(vm.tpreports[i].totalrecieved);
			vm.tpreports[i].totalprofit = formatter.format(vm.tpreports[i].totalprofit);
			vm.tpreports[i].totalspiffs = formatter.format(vm.tpreports[i].totalspiffs);
		}
	});
	vm.createTpReport = function() {
		$(".tpreports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><tpreportcreate></tpreportcreate></div>";
		var el = angular.element(stringToAppend)	
		$(".tpreports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.deleteTpReport = function(tpreportid) {
		vm.tpreport = {
			id : tpreportid
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
	vm.readOne = function(tpreportid){
		console.log(vm.tpreports);
		for (var i = 0; i < vm.tpreports.length; i++) {
			if(vm.tpreports[i]._id === tpreportid){
				vm.clickedTpReport = vm.tpreports[i];
				console.log(vm.clickedTpReport);
			}
		}
	}
	vm.editTpReport = function(tpreportid){
		vm.tpreport = {
			id : tpreportid
		}
		tpreport.setTpReport(vm.tpreport);
		$(".tpreports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><tpreportsedit></tpreportsedit></div>";
		var el = angular.element(stringToAppend)
		$(".tpreports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.confirmDelete = function(){
		tpreport.deleteTpReport(vm.tpreport.id).then(function(response){
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
		$(".tpreports-container").empty();
		var stringToAppend = "<div class='col-xs-12'><tpreportslist></tpreportslist></div>";
		var el = angular.element(stringToAppend)
		$(".tpreports-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.exportTpReports = function(){
		exportservice.exportCSV(vm.tpreports,"TpReports").then(function(response){
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