(function () {
	angular
		.module('ssacpos')
		.controller('navigationCtrl', navigationCtrl);

	navigationCtrl.$inject = ['$location','authentication'];

	function navigationCtrl($location,authentication) {
		var vm = this;
		
		vm.currentUser = authentication.currentUser();
		vm.isLoggedIn = authentication.isLoggedIn();
		if(!vm.isLoggedIn){
			vm.Guest = true;
		}else{
			vm.Guest = false;
			
		}
		vm.goRoot = function() {
			$location.path('/home');
		}
		vm.logout = function() {
			authentication.logout();
			$location.path('/home');
		}
	}
})();