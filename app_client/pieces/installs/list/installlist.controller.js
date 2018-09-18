(function(){
angular
	.module('ssacpos')
	.controller('installlistCtrl', installlistCtrl);

installlistCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'install'];

function installlistCtrl($location, $scope, $compile, authentication, install) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		install.getInstalls().then(function(response){
			vm.installs = response.data;
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
		$(".data-container").empty();
		var stringToAppend = "<div class='col-xs-12 piece'><spiffedit></spiffedit></div>";
		var el = angular.element(stringToAppend)
		$(".data-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.confirmDelete = function(){
		console.log(vm.spiff);
		spiff.deleteSpiff(vm.spiff).then(function(response){
			console.log(response);
			$(".dialogbox").hide();
			spiff.getSpiffs().then(function(response){
				vm.spiffs = response.data;
				console.log(response);
			})
		})
	}
	vm.cancel = function(){
		$(".dialogbox").hide();
	}
	vm.addSpiff = function() {
		$(".data-container").empty();
		var stringToAppend = "<div class='col-xs-12 piece'><spiffcreate></spiffcreate></div>";
		var el = angular.element(stringToAppend)
		$(".data-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	}
};
})();