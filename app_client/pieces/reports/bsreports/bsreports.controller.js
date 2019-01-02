(function(){
angular
	.module('ssacpos')
	.controller('bsreportsCtrl', bsreportsCtrl);

bsreportsCtrl.$inject = ['$window','$location','$scope','$compile','bsreport'];

function bsreportsCtrl($window,$location,$scope,$compile,bsreport) {
	var vm = this;
	$(".bsreports-container").empty();
	var stringToAppend = "<div class='col-xs-12'><bsreportslist></bsreportslist></div>";
	var el = angular.element(stringToAppend)
	$(".bsreports-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();