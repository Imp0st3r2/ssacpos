(function(){
angular
	.module('ssacpos')
	.controller('streportsCtrl', streportsCtrl);

streportsCtrl.$inject = ['$window','$location','$scope','$compile','streport'];

function streportsCtrl($window,$location,$scope,$compile,streport) {
	var vm = this;
	$(".streports-container").empty();
	var stringToAppend = "<div class='col-xs-12'><streportslist></streportslist></div>";
	var el = angular.element(stringToAppend)
	$(".streports-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();