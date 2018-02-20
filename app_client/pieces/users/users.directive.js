(function () {
	angular
		.module('ssacpos')
		.directive('users', users);

	function users() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/users/users.template.html',
			controller: 'usersCtrl as uvm'
		};
	}
}) ();