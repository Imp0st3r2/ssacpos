(function(){
angular
	.module('ssacpos')
	.controller('spiffeditCtrl', spiffeditCtrl);

spiffeditCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'spiff'];

function spiffeditCtrl($location, $scope, $compile, authentication, spiff) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.currentSpiff = spiff.recallSpiff();
		console.log(vm.currentSpiff);

		spiff.getSpiff(vm.currentSpiff).then(function(response){
			vm.currentSpiff = response.data;
			console.log(vm.currentSpiff);
		});

		vm.submitSpiff = function(){
			console.log($("#spiff-name").val());
			console.log(vm.currentSpiff);
			if(vm.currentSpiff.name != ""){
				if(vm.currentSpiff.amount != 0){
					vm.formError = "";
					if(!vm.formError){
						spiff.updateSpiff(vm.currentSpiff).then(function(response){
							console.log(response);
							vm.updatedSpiff = response.data;
							$(".dialogbox").empty();
							var appendString = "<div class='row'>"
											 +  "<div class='col-xs-12'>"
											 + 	 "<p>"
											 +		vm.updatedSpiff.name + "<br>"
											 +		vm.updatedSpiff.amount + "<br>"
											 +		"Has been successfully updated!"
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
							console.log(response);
							$(".dialogbox").show();
						},function(err){
							console.log(err.data.errmsg);
							var message = "";
							if(err.data.errmsg.substring(0,6) === "E11000"){
								message = "Duplicate Email, Please try a different Email.";
							}else{
								message = "There was an error creating the user.";
							}
							vm.formError = message;
						})
					}
				}else{
					vm.formError = "You must supply a spiff amount."
					console.log(vm.newUser);
				}
			}else{
				vm.formError = "You must supply a spiff name.";
				console.log(vm.newUser);
			}
		}

		vm.cancel = function(){
			$(".dialogbox").hide();
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
	}else{
		$location.path('/home');
	}
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	}
};
})();