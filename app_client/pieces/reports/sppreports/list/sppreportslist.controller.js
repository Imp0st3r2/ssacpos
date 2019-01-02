(function(){
angular
	.module('ssacpos')
	.controller('sppreportslistCtrl', sppreportslistCtrl);

sppreportslistCtrl.$inject = ['$window','$location','$scope','$compile','sppreport','authentication','exportservice'];

function sppreportslistCtrl($window,$location,$scope,$compile,sppreport,authentication,exportservice) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		const formatter = new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'USD',
		  minimumFractionDigits: 2
		})
		sppreport.getListofSppReports().then(function(response){
			vm.sppreports = response.data;
			console.log(vm.sppreports);
			for(var i=0;i<vm.sppreports.length;i++){
				var creationdate = moment(vm.sppreports[i].creationdate).format("MM-DD-YYYY hh:mm A");
				console.log(creationdate);
				var startdate = vm.sppreports[i].startdate.split("T");
				var enddate = vm.sppreports[i].enddate.split("T");
				vm.sppreports[i].startdate = startdate[0];
				vm.sppreports[i].enddate = enddate[0];
				vm.sppreports[i].creationdate = creationdate;
				if(vm.sppreports[i].percgp){
					vm.sppreports[i].percgp = Number(vm.sppreports[i].percgp.toFixed(2));
				}
				vm.sppreports[i].totalitemcost = formatter.format(vm.sppreports[i].totalitemcost);
				vm.sppreports[i].totalitemprice = formatter.format(vm.sppreports[i].totalitemprice);
				vm.sppreports[i].totalprofit = formatter.format(vm.sppreports[i].totalprofit);
				vm.sppreports[i].totalspiffs = formatter.format(vm.sppreports[i].totalspiffs);
				for(var j=0;j<vm.sppreports[i].items.length;j++){
					vm.sppreports[i].items[j].spiffamount = formatter.format(vm.sppreports[i].items[j].spiffamount);
					vm.sppreports[i].items[j].totalcharge = formatter.format(vm.sppreports[i].items[j].totalcharge);
					vm.sppreports[i].items[j].profit = formatter.format((vm.sppreports[i].items[j].unitprice * vm.sppreports[i].items[j].quantity) - (vm.sppreports[i].items[j].unitcost * vm.sppreports[i].items[j].quantity));
					vm.sppreports[i].items[j].unitcost = formatter.format(vm.sppreports[i].items[j].unitcost);
					vm.sppreports[i].items[j].unitprice = formatter.format(vm.sppreports[i].items[j].unitprice);
				}
			}
			console.log(vm.sppreports);
		});

		vm.createSppReport = function() {
			$(".sppreports-container").empty();
			var stringToAppend = "<div class='col-xs-12'><sppreportcreate></sppreportcreate></div>";
			var el = angular.element(stringToAppend)	
			$(".sppreports-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
		vm.deleteSppReport = function(sppreportid) {
			vm.sppreport = {
				id : sppreportid
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
			$("#sppreportModal").modal('hide');
		}
		vm.readOne = function(sppreportid){
			vm.clickedSppReport = {};
			console.log(vm.sppreports);
			for (var i = 0; i < vm.sppreports.length; i++) {
				if(vm.sppreports[i]._id === sppreportid){
					vm.clickedSppReport = vm.sppreports[i];
					console.log(vm.clickedSppReport);
				}
			}
		}
		vm.editSppReport = function(sppreportid){
			vm.sppreport = {
				id : sppreportid
			}
			sppreport.setSppReport(vm.sppreport);
			$(".sppreports-container").empty();
			var stringToAppend = "<div class='col-xs-12'><sppreportedit></sppreportedit></div>";
			var el = angular.element(stringToAppend)
			$(".sppreports-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
		vm.confirmDelete = function(){
			sppreport.deleteSppReport(vm.sppreport.id).then(function(response){
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
			$(".sppreports-container").empty();
			var stringToAppend = "<div class='col-xs-12'><sppreportslist></sppreportslist></div>";
			var el = angular.element(stringToAppend)
			$(".sppreports-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
		vm.cancel = function(){
			$(".dialogbox").hide();
		}

		vm.printSppReport = function(){
			$window.open("/sppreports/"+vm.clickedSppreport._id,"_blank");
		}
		vm.exportSppReports = function(){
			exportservice.exportCSV(vm.sppreports,"SppReports").then(function(response){
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
	}else{
		$location.path('/home');
	}
};
})();