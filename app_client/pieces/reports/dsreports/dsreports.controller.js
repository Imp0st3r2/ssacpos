(function(){
angular
	.module('ssacpos')
	.controller('dsreportsCtrl', dsreportsCtrl);

dsreportsCtrl.$inject = ['$window','$location','$scope','$compile','dsreport'];

function dsreportsCtrl($window,$location,$scope,$compile,dsreport) {
	var vm = this;
	$(".dsreports-container").empty();
	var stringToAppend = "<div class='col-xs-12'><dsreportslist></dsreportslist></div>";
	var el = angular.element(stringToAppend)
	$(".dsreports-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();