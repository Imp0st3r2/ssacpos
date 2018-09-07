(function(){
angular
	.module('ssacpos')
	.controller('dashboardCtrl', dashboardCtrl);

dashboardCtrl.$inject = ['$location', '$scope', '$compile', 'authentication'];

function dashboardCtrl ($location, $scope, $compile, authentication) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	vm.currentSection = "";
	var currentpiece = "";
	if(vm.isLoggedIn){
		vm.insertPiece = function(piece){
			currentpiece = piece;
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><"+piece+"></"+piece+"></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
	     	compiled = $compile(el);
	     	compiled($scope);
		}
		$(".posbtn").click(function(){
	     	if($(this).data("button") === "reports"){
	     		$("#report-minibtns").slideDown();
	     	}else{
	     		$(".miniactive").removeClass("miniactive");
	     		$("#report-minibtns").slideUp();
	     	}
			$(".active").removeClass("active");
			$(this).addClass("active");
		})
		$(".posbtn-mini").click(function(){
			$(".miniactive").removeClass("miniactive");
			$(this).addClass("miniactive");
		})
	}else{
		$location.path('/home');
	}
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	}
};
})();