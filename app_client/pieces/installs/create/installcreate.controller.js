(function(){
angular
	.module('ssacpos')
	.controller('installcreateCtrl', installcreateCtrl);

installcreateCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'install'];

function installcreateCtrl($location, $scope, $compile, authentication, install) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	vm.newInstall = {
		time : 0,
		description : "",
		hourlycharge : 0,
		totalcharge : 0,
		cost : 0
	};
	if(vm.isLoggedIn){
		vm.submitInstall = function(){
			if(vm.newInstall.time != 0){
				if(vm.newInstall.description != ""){
					if(vm.hourlycharge != 0){
						vm.formError = "";
						if(!vm.formError){
							vm.newInstall.totalcharge = vm.newInstall.time * vm.newInstall.hourlycharge;
							install.createInstall(vm.newInstall).then(function(response){
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
								console.log(response);
								$(".dialogbox").show();
							},function(err){
								console.log(err);
								var message = "";
								if(err){
									message = "There was an error creating the install.";
								}
								vm.formError = message;
							})
						}
					}else{
						vm.formError = "You must supply an hourly charge.";
					}
				}else{
					vm.formError = "You must supply a install description."
				}
			}else{
				vm.formError = "You must supply the amount of time the install takes.";
			}
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
	}else{
		$location.path('/home');
	}
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	}
};
})();