(function(){
angular
	.module('ssacpos')
	.controller('ipreportsCtrl', ipreportsCtrl);

ipreportsCtrl.$inject = ['$window','$location','$scope','$compile','ipreport'];

function ipreportsCtrl($window,$location,$scope,$compile,ipreport) {
	var vm = this;
	ipreport.getListofIpReports().then(function(response){
		vm.ipreports = response.data;
		console.log(vm.ipreports);
	});
	vm.createIpReport = function() {
		$(".data-container").empty();
		var stringToAppend = "<div class='col-xs-12 piece'><ipreportcreate></ipreportcreate></div>";
		var el = angular.element(stringToAppend)	
		$(".data-container").append(el);
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
		$("#invoiceModal").modal('hide');
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
		$(".data-container").empty();
		var stringToAppend = "<div class='col-xs-12 piece'><ipreportedit></ipreportedit></div>";
		var el = angular.element(stringToAppend)
		$(".data-container").append(el);
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
	vm.cancel = function(){
		$(".dialogbox").hide();
	}

	vm.printInvoice = function(){
		$window.open("/invoices/"+vm.clickedInvoice._id,"_blank");
	}
};
})();