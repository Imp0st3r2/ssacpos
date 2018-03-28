(function () {
	angular
		.module('ssacpos')
		.directive('accounts', accounts);

	function accounts() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/accounts/accounts.template.html',
			controller: 'accountsCtrl as avm'
		};
	}
}) ();