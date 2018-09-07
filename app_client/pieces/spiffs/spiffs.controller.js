(function(){
angular
	.module('ssacpos')
	.controller('spiffsCtrl', spiffsCtrl);

spiffsCtrl.$inject = ['$location','$scope','$compile'];

function spiffsCtrl ($location,$scope,$compile) {
	var vm = this;
	$(".spiffs-container").empty();
	var stringToAppend = "<div class='col-xs-12'><spifflist></spifflist></div>";
	var el = angular.element(stringToAppend);
	$(".spiffs-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();