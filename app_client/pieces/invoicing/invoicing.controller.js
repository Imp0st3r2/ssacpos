(function(){
angular
	.module('ssacpos')
	.controller('invoicingCtrl', invoicingCtrl);

invoicingCtrl.$inject = ['$window','$location','$scope','$compile','invoice'];

function invoicingCtrl ($window,$location,$scope,$compile,invoice) {
	var vm = this;
	$(".invoicing-container").empty();
	var stringToAppend = "<div class='col-xs-12'><invoicinglist></invoicinglist></div>";
	var el = angular.element(stringToAppend)
	$(".invoicing-container").append(el);
	compiled = $compile(el);
	compiled($scope);
};
})();