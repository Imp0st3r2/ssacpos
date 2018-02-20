(function () {
	angular
		.module('ssacpos')
		.directive('userlist', userlist);

	function userlist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/users/list/userlist.template.html',
			controller: 'userlistCtrl as uvm'
		};
	}
}) ();