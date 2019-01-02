(function(){
angular
	.module('ssacpos')
	.controller('installlistCtrl', installlistCtrl);

installlistCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'install', 'exportservice'];

function installlistCtrl($location, $scope, $compile, authentication, install, exportservice) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 2
	})
	if(vm.isLoggedIn){
		install.getInstalls().then(function(response){
			vm.installs = response.data;
			console.log(response);
			for(var i=0;i<vm.installs.length;i++){
				vm.installs[i].cost = formatter.format(vm.installs[i].cost);
				vm.installs[i].hourlycharge = formatter.format(vm.installs[i].hourlycharge);
			}
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
			$(".installs-container").empty();
			var stringToAppend = "<div class='col-xs-12'><installedit></installedit></div>";
			var el = angular.element(stringToAppend)
			$(".installs-container").append(el);
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
			$(".installs-container").empty();
			var stringToAppend = "<div class='col-xs-12'><installlist></installlist></div>";
			var el = angular.element(stringToAppend)
			$(".installs-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
		vm.cancel = function(){
			$(".dialogbox").hide();
		}
		vm.addInstall = function() {
			$(".installs-container").empty();
			var stringToAppend = "<div class='col-xs-12'><installcreate></installcreate></div>";
			var el = angular.element(stringToAppend)
			$(".installs-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}

		vm.exportInstalls = function(){
			console.log(vm.installs);
			exportservice.exportCSV(vm.installs,"Installs").then(function(response){
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
								 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='ivm.showList();'>OK</button></div>"
								 +	"<div class='col-xs-3'></div>"; 
				var el = angular.element(appendString)
				$(".dialogbox").append(el);
				compiled = $compile(el);
				compiled($scope);
				$(".dialogbox").show();
			})
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