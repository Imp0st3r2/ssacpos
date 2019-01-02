(function(){
angular
	.module('ssacpos')
	.controller('homepageCtrl', homepageCtrl);

homepageCtrl.$inject = ['$location','$compile','$scope','authentication','user'];

function homepageCtrl ($location,$compile,$scope,authentication,user) {
	var vm = this;
	user.getUsers().then(function(response){
		if(response.data.length < 1){
			$(".dialogbox").empty();
			var appendString = "<div class='row'>"
							 +  "<div class='col-xs-12'>"
							 + 	 "<p>This appears to be your first time accessing the system, please setup your Administrator account now.</p>"
							 +	"</div>"
							 + "</div>"
							 + "<div class='row'>"
							 +	"<div class='col-xs-3'></div>"
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='vm.administratorSetup();'>OK</button></div>"
							 +	"<div class='col-xs-3'></div>"; 
			var el = angular.element(appendString)
			$(".dialogbox").append(el);
			compiled = $compile(el);
			compiled($scope);
			$(".dialogbox").show();
		}
	})
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		$location.path('/dashboard');
	}
	$("#user-pass").keyup(function(event){
		if(event.keyCode === 13){
			vm.login();
		}
	})
	vm.administratorSetup = function(){
		$(".dialogbox").empty();
		vm.newAdmin = {
			name : "",
			email : "",
			confemail : "",
			password : "",
			confpassword : "",
			status : "Administrator"
		}
		var appendString = "<div class='row'>"
						 +  "<div class='col-xs-12'>"
						 +  	"<form class='form'>"
						 +			"<div role='alert' ng-show='vm.formError' class='alert alert-danger'>{{ vm.formError }}</div>"
						 +			"<div class='form-group'>"
						 +				"<label for='user-name'>Enter User Name: </label>"
						 +				"<input class='form-control' type='text' id='user-name' name='user-name' placeholder='Enter user name here.'' ng-model='vm.newAdmin.name'>"
						 +			"</div>"
						 +			"<div class='form-group'>"
						 +				"<label for='user-email'>Enter User Email: </label>"
						 +				"<input class='form-control' type='text' id='user-email' name='user-email' placeholder='Enter user email here.' ng-model='vm.newAdmin.email'>"
						 +			"</div>"
						 +			"<div class='form-group'>"
						 +				"<label for='user-email-conf'>Confirm User Email: </label>"
						 +				"<input class='form-control' type='text' id='user-email-conf' name='user-email-conf' placeholder='Confirm user email here.' ng-model='vm.newAdmin.confemail'>"
						 +			"</div>"
						 +			"<div class='form-group'>"
						 +				"<label for='user-pass'>Enter User Password: </label>"
						 +				"<input class='form-control' type='password' id='user-pass' name='user-pass' placeholder='Enter user password here.' ng-model='vm.newAdmin.password'>"
						 +			"</div>"
						 +			"<div class='form-group'>"
						 +				"<label for='user-pass-conf'>Confirm User Password: </label>"
						 +				"<input class='form-control' type='password' id='user-pass-conf' name='user-pass-conf' placeholder='Confirm user password here.' ng-model='vm.newAdmin.confpassword'>"
						 +			"</div>"
						 +		"</form>"
						 +	"</div>"
						 + "</div>"
						 + "<div class='row'>"
						 +	"<div class='col-xs-3'></div>"
						 +	"<div class='col-xs-6'><button class='btn btn-success btn-full' type='button' ng-click='vm.createAdmin();'>Create</button></div>"
						 +	"<div class='col-xs-3'></div>"; 
		var el = angular.element(appendString)
		$(".dialogbox").append(el);
		compiled = $compile(el);
		compiled($scope);
		$(".dialogbox").show();
	}
	vm.createAdmin = function(){
		if(vm.newAdmin.name != ""){
				if(vm.newAdmin.email != ""){
					if(vm.newAdmin.confemail != ""){
						if(vm.newAdmin.email === vm.newAdmin.confemail){
							if(vm.newAdmin.password != ""){
								if(vm.newAdmin.confpassword != ""){
									if(vm.newAdmin.password === vm.newAdmin.confpassword){
										if(vm.newAdmin.status != ""){
											vm.formError = "";
											if(!vm.formError){
												user.createUser(vm.newAdmin).then(function(response){
													$(".dialogbox").empty();
													var appendString = "<div class='row'>"
																	 +  "<div class='col-xs-12'>"
																	 + 	 "<p>"+response.data+"</p>"
																	 +	"</div>"
																	 + "</div>"
																	 + "<div class='row'>"
																	 +	"<div class='col-xs-3'></div>"
																	 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='vm.closeDialog();'>OK</button></div>"
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
	vm.closeDialog = function(){
		$(".dialogbox").hide();
	}
	vm.login = function(){
		var user = {
			email : $("#user-name").val(),
			password : $("#user-pass").val()
		}
		authentication
			.login(user)
			.then(function(){
				$location.path('/dashboard');
			},function(err){
				vm.formError = err;
			});
	}
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	}
};
})();