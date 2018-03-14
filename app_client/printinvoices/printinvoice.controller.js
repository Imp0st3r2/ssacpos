(function(){
angular
	.module('ssacpos')
	.controller('printInvoiceCtrl', printInvoiceCtrl);

printInvoiceCtrl.$inject = ['$routeParams', '$location', '$scope', '$compile', 'authentication','invoice'];

function printInvoiceCtrl ($routeParams, $location, $scope, $compile, authentication, invoice) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	vm.currentInvoice = {};
	vm.currentInvoice._id = $routeParams.invoiceid;
	console.log(vm.currentInvoice);
	if(vm.isLoggedIn){
		$("#printbutton").show();
		$('body').css('padding','0');
		$('body').css('background-color','#fff');
		invoice.getInvoiceById(vm.currentInvoice._id).then(function(response){
			vm.currentInvoice = response.data;
			console.log(vm.currentInvoice);
			vm.areacode = "(" + vm.currentInvoice.phone.substring(0,3) + ")";
			vm.citycode = vm.currentInvoice.phone.substring(3,6);
			vm.phonenumber = vm.areacode + " " + vm.citycode + "-" + vm.currentInvoice.phone.substring(6,vm.currentInvoice.phone.length);
			console.log(vm.phonenumber);
		})
		vm.printInvoice = function(){
			$("#printbutton").hide();
			window.print();
			$("#printbutton").show();
		}
	}else{
		$location.path('/home');
	}
};
})();