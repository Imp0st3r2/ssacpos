(function () {
	angular
		.module('ssacpos')
		.directive('accountedit', accountedit);

	function accountedit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/accounts/edit/accountedit.template.html',
			controller: 'accounteditCtrl as avm'
		};
	}
}) ();