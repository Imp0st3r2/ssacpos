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
		vm.deleteInstall = function(installid){
			vm.install = {
				id : installid
			};
			$(".dialogbox").empty();
			var appendString = "<div class='row'>"
							 +  "<div class='col-xs-12'>"
							 + 	 "<p>Are you sure you would like to delete this install?</p>"
							 +	"</div>"
							 + "</div>"
							 + "<div class='row'>"
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='ivm.confirmDelete();'>Yes</button></div>"
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='ivm.cancel();'>No</button></div>"
							 + "</div>"; 
			var el = angular.element(appendString)
			$(".dialogbox").append(el);
			compiled = $compile(el);
			compiled($scope);
			$(".dialogbox").show();
		}
		vm.editInstall = function(installid){
			vm.install = {
				id : installid
			}
			install.setInstall(vm.install);
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><installedit></installedit></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
		vm.confirmDelete = function(){
			console.log(vm.install);
			install.deleteInstall(vm.install).then(function(response){
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
								 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='ivm.showList();'>OK</button></div>"
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
			var stringToAppend = "<div class='col-xs-12 piece'><installlist></installlist></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
		vm.cancel = function(){
			$(".dialogbox").hide();
		}
		vm.addInstall = function() {
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><installcreate></installcreate></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}

		vm.exportInstalls = function(){
			
		}







		vm.logout = function() {
			authentication.logout();
			$location.path('/home');
		}
	}else{
		$location.path('/home');
	}
};
})();