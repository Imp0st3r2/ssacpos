(function(){
angular
	.module('ssacpos')
	.controller('ipreportsCtrl', ipreportsCtrl);

ipreportsCtrl.$inject = ['$window','$location','$scope','$compile','ipreport'];

function ipreportsCtrl($window,$location,$scope,$compile,ipreport) {
	var vm = this;
	$(".ipreports-container").empty();
	var stringToAppend = "<div class='col-xs-12'><ipreportslist></ipreportslist></div>";
	var el = angular.element(stringToAppend)
	$(".ipreports-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();