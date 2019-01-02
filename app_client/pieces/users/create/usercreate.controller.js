(function(){
angular
	.module('ssacpos')
	.controller('usercreateCtrl', usercreateCtrl);

usercreateCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'user'];

function usercreateCtrl($location, $scope, $compile, authentication, user) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	vm.newUser = {
		name : "",
		email : "",
		confemail : "",
		password : "",
		confpassword : "",
		status : ""
	};
	if(vm.isLoggedIn){
		vm.submitUser = function(){
			console.log($("#user-name").val());
			console.log(vm.newUser);
			if(vm.newUser.name != ""){
				if(vm.newUser.email != ""){
					if(vm.newUser.confemail != ""){
						if(vm.newUser.email === vm.newUser.confemail){
							if(vm.newUser.password != ""){
								if(vm.newUser.confpassword != ""){
									if(vm.newUser.password === vm.newUser.confpassword){
										if(vm.newUser.status != ""){
											vm.formError = "";
											if(!vm.formError){
												user.createUser(vm.newUser).then(function(response){
													$(".dialogbox").empty();
													var appendString = "<div class='row'>"
																	 +  "<div class='col-xs-12'>"
																	 + 	 "<p>"+response.data+"</p>"
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
										vm.formError = "Password & Confirmation Password do not match.";
										console.log(vm.newUser);
									}
								}else{
									vm.formError = "You must supply a confirmation password.";
									console.log(vm.newUser);
								}
							}else{
								vm.formError = "You must supply a password.";
								console.log(vm.newUser);
							}
						}else{
							vm.formError = "Email & Confirmation Email do not match.";
							console.log(vm.newUser);
						}
					}else{
						vm.formError = "You must supply a confirmation email address.";
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
		vm.showList = function(){
			$(".dialogbox").hide();
			$(".users-container").empty();
			var stringToAppend = "<div class='col-xs-12'><userlist></userlist></div>";
			var el = angular.element(stringToAppend)
			$(".users-container").append(el);
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