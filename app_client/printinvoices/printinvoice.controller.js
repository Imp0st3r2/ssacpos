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