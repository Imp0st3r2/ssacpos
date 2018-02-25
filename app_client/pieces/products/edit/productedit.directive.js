(function () {
	angular
		.module('ssacpos')
		.directive('productedit', productedit);

	function productedit() {
		return {
			restrict: 'EA',
			scope: {},
			templateUrl: '/pieces/products/edit/productedit.template.html',
			controller: 'producteditCtrl as pevm'
		};
	}
}) ();