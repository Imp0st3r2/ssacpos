(function(){
angular
	.module('ssacpos')
	.controller('accountsCtrl', accountsCtrl);

accountsCtrl.$inject = ['$location','$scope','$compile','account', 'invoice'];

function accountsCtrl ($location,$scope,$compile, account, invoice) {
	var vm = this;
	$(".accounts-container").empty();
	var stringToAppend = "<div class='col-xs-12'><accountslist></accountslist></div>";
	var el = angular.element(stringToAppend)
	$(".accounts-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();