(function(){
angular
	.module('ssacpos')
	.controller('productsCtrl', productsCtrl);

productsCtrl.$inject = ['$location','$scope','$compile','product'];

function productsCtrl ($location,$scope,$compile,product) {
	var vm = this;
	$(".products-container").empty();
	var stringToAppend = "<div class='col-xs-12'><productslist></productslist></div>";
	var el = angular.element(stringToAppend)
	$(".products-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();