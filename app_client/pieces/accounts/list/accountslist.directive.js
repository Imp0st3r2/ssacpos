(function () {
	angular
		.module('ssacpos')
		.directive('accountslist', accountslist);

	function accountslist() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/accounts/list/accountslist.template.html',
			controller: 'accountslistCtrl as avm'
		};
	}
}) ();