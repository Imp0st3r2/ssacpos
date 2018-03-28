(function(){
angular
	.module('ssacpos')
	.controller('accountcreateCtrl', accountcreateCtrl);

accountcreateCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'account'];

function accountcreateCtrl($location, $scope, $compile, authentication, account) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.accounts = {};
		vm.newaccount = {
			firstname : "",
			lastname : "",
			address : "",
			city : "",
			state : "",
			zip : "",
			email : "",
			phone : "",
			taxexempt : false
		};
		$(document).on('keydown', function(e) {
    		// console.log("key pressed");
    		if (e.which == 13) {
        		e.preventDefault();
    		}
		});
		$("#account-phone").keypress(function(){
			// console.log("key pressed");
			if($("#account-phone").val().length === 0){
				vm.newaccount.phone = "(" + vm.newaccount.phone;
				$("#account-phone").val(vm.newaccount.phone);
			}else{
				// console.log(phoneCount);
				if($("#account-phone").val().length === 4){
					vm.newaccount.phone = vm.newaccount.phone + ")";
					$("#account-phone").val(vm.newaccount.phone);
				}else if($("#account-phone").val().length === 8){
					vm.newaccount.phone = vm.newaccount.phone + "-";
					$("#account-phone").val(vm.newaccount.phone);
				}
			}
		});
		vm.submitAccount = function(){
			console.log("test");
			vm.formError = "";
			if(vm.newaccount.firstname != ""){
				if(vm.newaccount.lastname != ""){
					if(vm.newaccount.address != ""){
						if(vm.newaccount.state != ""){
							if(vm.newaccount.city != ""){
								if(vm.newaccount.zip != ""){
									if(vm.newaccount.phone != ""){
										account.createAccount(vm.newaccount).then(function(response){
											if(response.status === 200){
												$(".dialogbox").empty();
												var appendString = "<div class='row'>"
																 +  "<div class='col-xs-12'>"
																 + 	 "<p>Successfully created customer account!</p>"
																 +	"</div>"
																 + "</div>"
																 + "<div class='row'>"
																 +	"<div class='col-xs-3'></div>"
																 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='avm.showList();'>OK</button></div>"
																 +	"<div class='col-xs-3'></div>"; 
												var el = angular.element(appendString)
												$(".dialogbox").append(el);
												compiled = $compile(el);
												compiled($scope);
												console.log(response);
												$(".dialogbox").show();
											}
										})
									}else{
										vm.formError = "You must enter a phone number.";
										$("#account-phone").addClass('is-invalid');
									}
								}else{
									vm.formError = "You must enter a zip code.";
									$("#account-zip").addClass('is-invalid');
								}
							}else{
								vm.formError = "You must enter a city."
								$("#account-city").addClass('is-invalid');
							}
						}else{
							vm.formError = "You must enter a state.";
							$("#account-state").addClass('is-invalid');
						}
					}else{
						vm.formError = "You must enter an address.";
						$("#account-address").addClass('is-invalid');
					}

				}else{
					vm.formError = "You must enter a last name.";
					$("#account-lastname").addClass('is-invalid');
				}
			}else{
				vm.formError = "You must enter a first name.";
				$("#account-firstname").addClass('is-invalid');
				console.log(vm.formError);
			}
		}
		vm.showList = function(){
			$(".dialogbox").hide();
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><accounts></accounts></div>";
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