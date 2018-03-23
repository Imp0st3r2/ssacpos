(function(){
angular
	.module('ssacpos')
	.controller('reportcreateCtrl', reportcreateCtrl);

reportcreateCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'report', 'invoice'];

function reportcreateCtrl($location, $scope, $compile, authentication, report, invoice) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		vm.report = {};
		$("#report-startdate").datepicker();
		$("#report-enddate").datepicker();
		vm.submitReport = function(){
			vm.report.startdate = $("#report-startdate").val();
			var startdate = vm.report.startdate.split('/');
			console.log(startdate);
			vm.report.startdate = startdate[2] + "-" + startdate[0] + "-" + startdate[1];
			console.log(vm.report.startdate);
			vm.report.enddate = $("#report-enddate").val();
			var enddate = vm.report.enddate.split('/');
			console.log(enddate);
			vm.report.enddate = enddate[2] + "-" + enddate[0] + "-" + enddate[1];
			console.log(vm.report.enddate);
			invoice.getInvoicesByDates(vm.report.startdate,vm.report.enddate).then(function(response){
				console.log(response.data);
			})
		}
		vm.showList = function(){
			$(".dialogbox").hide();
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><reports></reports></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
	}else{
		$location.path('/home');
	}
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	}
};
})();