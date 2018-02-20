(function(){
angular
	.module('ssacpos')
	.controller('usereditCtrl', usereditCtrl);

usereditCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'user'];

function usereditCtrl($location, $scope, $compile, authentication, user) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.currentUser = user.recallUser();
		console.log(vm.currentUser);

		user.getUser(vm.currentUser).then(function(response){
			vm.currentUser = response.data;
			console.log(vm.currentUser);
		});

		vm.submitUser = function(){
			console.log($("#user-name").val());
			console.log(vm.currentUser);
			if(vm.currentUser.name != ""){
				if(vm.currentUser.email != ""){
					if(vm.currentUser.status != ""){
						vm.formError = "";
						if(!vm.formError){
							user.updateUser(vm.currentUser).then(function(response){
								console.log(response);
								vm.updatedUser = response.data;
								$(".dialogbox").empty();
								var appendString = "<div class='row'>"
												 +  "<div class='col-xs-12'>"
												 + 	 "<p>"
												 +		vm.updatedUser.name + "<br>"
												 +		vm.updatedUser.email + "<br>"
												 +		vm.updatedUser.status + "<br>"
												 +		"Has been successfully updated!"
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
						vm.formError = "You must select a status for your user";
						console.log(vm.newUser);
					}
				}else{
					vm.formError = "You must supply an email address."
					console.log(vm.newUser);
				}
			}else{
				vm.formError = "You must supply a user name.";
				console.log(vm.newUser);
			}
		}

		vm.resetPassword = function(){
			$(".dialogbox").empty();
			var appendString = "<div class='row'>"
							 +  "<div class='col-xs-12'>"
							 + 	 "<p>Are you sure you would like to reset the password for: <br>"+vm.currentUser.email+"</p>"
							 +	"</div>"
							 + "</div>"
							 + "<div class='row'>"
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='uvm.confirmReset();'>Yes</button></div>"
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='uvm.cancel();'>No</button></div>"
							 + "</div>"; 
			var el = angular.element(appendString)
			$(".dialogbox").append(el);
			compiled = $compile(el);
			compiled($scope);
			$(".dialogbox").show();
		}
		vm.confirmReset = function(){
			user.setUser(vm.currentUser);
			$(".dialogbox").hide();
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><resetpass></resetpass></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
		vm.cancel = function(){
			$(".dialogbox").hide();
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