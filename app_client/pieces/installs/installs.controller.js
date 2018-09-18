(function(){
angular
	.module('ssacpos')
	.controller('installsCtrl', installsCtrl);

installsCtrl.$inject = ['$location','$scope','$compile'];

function installsCtrl ($location,$scope,$compile) {
	var vm = this;
	$(".installs-container").empty();
	var stringToAppend = "<div class='col-xs-12'><installlist></installlist></div>";
	var el = angular.element(stringToAppend);
	$(".installs-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();