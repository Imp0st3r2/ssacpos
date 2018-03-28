(function () {
	angular
		.module('ssacpos')
		.directive('accountcreate', accountcreate);

	function accountcreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/accounts/create/accountcreate.template.html',
			controller: 'accountcreateCtrl as avm'
		};
	}
}) ();