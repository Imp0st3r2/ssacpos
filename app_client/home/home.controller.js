(function(){
angular
	.module('ssacpos')
	.controller('homepageCtrl', homepageCtrl);

homepageCtrl.$inject = ['$location', 'authentication'];

function homepageCtrl ($location, authentication) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		$location.path('/dashboard');
	}
	$("#user-pass").keyup(function(event){
		if(event.keyCode === 13){
			vm.login();
		}
	})

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