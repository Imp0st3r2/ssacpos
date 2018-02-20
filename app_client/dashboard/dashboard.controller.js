(function(){
angular
	.module('ssacpos')
	.controller('dashboardCtrl', dashboardCtrl);

dashboardCtrl.$inject = ['$location', '$scope', '$compile', 'authentication'];

function dashboardCtrl ($location, $scope, $compile, authentication) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	vm.currentSection = "";
	if(vm.isLoggedIn){
		vm.insertPiece = function(piece){
			console.log(piece);
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><"+piece+"></"+piece+"></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
	     	compiled = $compile(el);
	     	compiled($scope);
		}
		$(".posbtn").click(function(){
			$(".active").removeClass("active");
			$(this).addClass("active");
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