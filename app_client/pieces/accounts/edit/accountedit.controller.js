(function(){
angular
	.module('ssacpos')
	.controller('accounteditCtrl', accounteditCtrl);

accounteditCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'account'];

function accounteditCtrl($location, $scope, $compile, authentication, account) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.currentAccount = account.recallAccount();
		console.log(vm.currentAccount);

		account.getAccountById(vm.currentAccount.id).then(function(response){
			vm.currentAccount = response.data;
			console.log(vm.currentAccount);
		});

		vm.submitAccount = function(){
			if(vm.currentAccount.firstname != ""){
				if(vm.currentAccount.lastname != ""){
					if(vm.currentAccount.address != ""){
						if(vm.currentAccount.state != ""){
							if(vm.currentAccount.city != ""){
								if(vm.currentAccount.zip != ""){
									if(vm.currentAccount.phone != ""){
										account.updateAccount(vm.currentAccount).then(function(response){
											if(response.status === 200){
												$(".dialogbox").empty();
												var appendString = "<div class='row'>"
																 +  "<div class='col-xs-12'>"
																 + 	 "<p>Successfully updated customer account!</p>"
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

		vm.cancel = function(){
			$(".dialogbox").hide();
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