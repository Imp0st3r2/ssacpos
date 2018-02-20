(function () {
	angular
		.module('ssacpos')
		.directive('usercreate', usercreate);

	function usercreate() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/users/create/usercreate.template.html',
			controller: 'usercreateCtrl as uvm'
		};
	}
}) ();