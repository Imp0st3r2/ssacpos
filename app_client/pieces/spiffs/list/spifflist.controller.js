(function(){
angular
	.module('ssacpos')
	.controller('spifflistCtrl', spifflistCtrl);

spifflistCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'spiff', 'exportservice'];

function spifflistCtrl($location, $scope, $compile, authentication, spiff, exportservice) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		spiff.getSpiffs().then(function(response){
			vm.spiffs = response.data;
			console.log(response);
		})
	}else{
		$location.path('/home');
	}
	vm.deleteSpiff = function(spiffid,spiffname){
		vm.spiff = {
			id : spiffid,
			name : spiffname
		}
		$(".dialogbox").empty();
		var appendString = "<div class='row'>"
						 +  "<div class='col-xs-12'>"
						 + 	 "<p>Are you sure you would like to delete: <br>"+vm.spiff.name+"</p>"
						 +	"</div>"
						 + "</div>"
						 + "<div class='row'>"
						 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='svm.confirmDelete();'>Yes</button></div>"
						 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='svm.cancel();'>No</button></div>"
						 + "</div>"; 
		var el = angular.element(appendString)
		$(".dialogbox").append(el);
		compiled = $compile(el);
		compiled($scope);
		$(".dialogbox").show();
	}
	vm.editSpiff = function(spiffid, spiffname){
		vm.spiff = {
			id : spiffid,
			name : spiffname
		}
		spiff.setSpiff(vm.spiff);
		$(".spiffs-container").empty();
		var stringToAppend = "<div class='col-xs-12'><spiffedit></spiffedit></div>";
		var el = angular.element(stringToAppend)
		$(".spiffs-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.confirmDelete = function(){
		console.log(vm.spiff);
		spiff.deleteSpiff(vm.spiff).then(function(response){
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
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='svm.showList();'>OK</button></div>"
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
	vm.addSpiff = function() {
		$(".spiffs-container").empty();
		var stringToAppend = "<div class='col-xs-12'><spiffcreate></spiffcreate></div>";
		var el = angular.element(stringToAppend)
		$(".spiffs-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}

	vm.exportSpiffs = function(){
		console.log(vm.spiffs);
		exportservice.exportCSV(vm.spiffs,"Spiffs").then(function(response){
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
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='svm.showList();'>OK</button></div>"
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
		$(".spiffs-container").empty();
		var stringToAppend = "<div class='col-xs-12'><spifflist></spifflist></div>";
		var el = angular.element(stringToAppend)
		$(".spiffs-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	}
};
})();