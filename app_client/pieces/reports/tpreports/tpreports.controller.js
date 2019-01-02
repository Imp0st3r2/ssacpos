(function(){
angular
	.module('ssacpos')
	.controller('tpreportsCtrl', tpreportsCtrl);

tpreportsCtrl.$inject = ['$window','$location','$scope','$compile','tpreport'];

function tpreportsCtrl($window,$location,$scope,$compile,tpreport) {
	var vm = this;
	$(".tpreports-container").empty();
	var stringToAppend = "<div class='col-xs-12'><tpreportslist></tpreportslist></div>";
	var el = angular.element(stringToAppend)
	$(".tpreports-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();