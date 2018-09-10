(function(){
angular
	.module('ssacpos')
	.controller('sppreportsCreateCtrl', sppreportsCreateCtrl);

sppreportsCreateCtrl.$inject = ['$window','$location','$scope','$compile','sppreport','authentication','user'];

function sppreportsCreateCtrl($window,$location,$scope,$compile,sppreport,authentication,user) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.employees = [];
		vm.sppreport = {
			startdate : '',
			enddate : '',
			employee : "",
		};
		user.getUsers().then(function(response){
			vm.employees = response.data;
			console.log(vm.employees);
		})
		vm.submitSppReport = function(){
			console.log($("#report-startdate").val());
			console.log($("#report-enddate").val())
			vm.sppreport.startdate = moment().format($("#report-startdate").val(),"MM-DD-YYYY");
			vm.sppreport.enddate = moment().format($("#report-enddate").val(),"MM-DD-YYYY");
			console.log(vm.sppreport);
		}

		vm.showList = function(){
			$(".dialogbox").hide();
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><sppreports></sppreports></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
	}else{
		$location.path('/home');
	}
};
})();