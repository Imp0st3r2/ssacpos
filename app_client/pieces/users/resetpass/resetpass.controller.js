(function(){
angular
	.module('ssacpos')
	.controller('resetpassCtrl', resetpassCtrl);

resetpassCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'user'];

function resetpassCtrl($location, $scope, $compile, authentication, user) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.currentUser = user.recallUser();
		console.log(vm.currentUser);
		user.getUser(vm.currentUser).then(function(response){
			vm.currentUser = response.data;
			console.log(vm.currentUser);
			vm.currentUser.password = "";
			vm.currentUser.confpassword = "";
		});

		vm.submitPassword = function(){
			console.log(vm.currentUser);
			if(vm.currentUser.password != ""){
				if(vm.currentUser.confpassword != ""){
					if(vm.currentUser.password === vm.currentUser.confpassword){
						vm.formError = "";
						if(!vm.formError){
							console.log(vm.currentUser);
							user.updatePassword(vm.currentUser).then(function(response){
								console.log(response);
								vm.updatedUser = response.data;
								$(".dialogbox").empty();
								var appendString = "<div class='row'>"
												 +  "<div class='col-xs-12'>"
												 + 	 "<p>"
												 +		vm.updatedUser.name + "<br>"
												 +		vm.updatedUser.email + "<br>"
												 +		vm.updatedUser.status + "<br>"
												 +		"Password successfully updated!"
												 +   "</p>"
												 +	"</div>"
												 + "</div>"
												 + "<div class='row'>"
												 +	"<div class='col-xs-3'></div>"
												 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='uvm.showList();'>OK</button></div>"
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
								if(err.data.errmsg.substring(0,6) === "E11000"){
									message = "Duplicate Email, Please try a different Email.";
								}else{
									message = "There was an error creating the user.";
								}
								vm.formError = message;
							})
						}
					}else{
						vm.formError = "The password and confirmation password do not match.";
						console.log(vm.newUser);
					}
				}else{
					vm.formError = "You must supply a confirmation password."
					console.log(vm.newUser);
				}
			}else{
				vm.formError = "You must supply a password.";
				console.log(vm.newUser);
			}
		}
		vm.showList = function(){
			$(".dialogbox").hide();
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><userlist></userlist></div>";
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