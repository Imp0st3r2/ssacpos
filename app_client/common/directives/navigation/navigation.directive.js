(function () {
	angular
		.module('ssacpos')
		.directive('navigation', navigation);

	function navigation() {
		return {
			restrict: 'EA',
			scope: {
				content : '=content'
			},
			templateUrl: '/common/directives/navigation/navigation.template.html',
			controller: 'navigationCtrl as navvm'
		};
	}
}) ();