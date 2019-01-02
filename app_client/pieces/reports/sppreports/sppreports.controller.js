(function(){
angular
	.module('ssacpos')
	.controller('sppreportsCtrl', sppreportsCtrl);

sppreportsCtrl.$inject = ['$window','$location','$scope','$compile','sppreport','authentication'];

function sppreportsCtrl($window,$location,$scope,$compile,sppreport,authentication) {
	var vm = this;
	$(".sppreports-container").empty();
	var stringToAppend = "<div class='col-xs-12'><sppreportslist></sppreportslist></div>";
	var el = angular.element(stringToAppend)
	$(".sppreports-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();