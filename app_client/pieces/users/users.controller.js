(function(){
angular
	.module('ssacpos')
	.controller('usersCtrl', usersCtrl);

usersCtrl.$inject = ['$location','$scope','$compile'];

function usersCtrl ($location,$scope,$compile) {
	var vm = this;
	$(".users-container").empty();
	var stringToAppend = "<div class='col-xs-12'><userlist></userlist></div>";
	var el = angular.element(stringToAppend)
	$(".users-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();