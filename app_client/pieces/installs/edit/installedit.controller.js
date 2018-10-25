(function(){
angular
	.module('ssacpos')
	.controller('installeditCtrl', installeditCtrl);

installeditCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'install'];

function installeditCtrl($location, $scope, $compile, authentication, install) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.currentInstall = install.recallInstall();
		console.log(vm.currentInstall);

		install.getInstallById(vm.currentInstall.id).then(function(response){
			vm.currentInstall = response.data;
			console.log(vm.currentInstall);
		});

		vm.submitInstall = function(){
			console.log(vm.currentInstall);
			if(vm.currentInstall.time != ""){
				if(vm.currentInstall.description != 0){
					if(vm.currentInstall.hourlycharge != 0){
						vm.formError = "";
						if(!vm.formError){
							install.updateInstall(vm.currentInstall).then(function(response){
								console.log(response);
								vm.updatedInstall = response.data;
								$(".dialogbox").empty();
								var appendString = "<div class='row'>"
												 +  "<div class='col-xs-12'>"
												 + 	 "<p>"
												 +		vm.updatedInstall.description + "<br>"
												 +		"Has been successfully updated!"
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
								console.log(response);
								$(".dialogbox").show();
							},function(err){
								console.log(err);
							})
						}
					}else{
						vm.formError = "You must supply an hourly charge for the install.";
					}
				}else{
					vm.formError = "You must supply an install description.";
				}
			}else{
				vm.formError = "You must supply the amount of time the install takes.";
			}
		}

		vm.cancel = function(){
			$(".dialogbox").hide();
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
	}else{
		$location.path('/home');
	}
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	}
};
})();