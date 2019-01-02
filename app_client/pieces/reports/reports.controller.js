(function(){
angular
	.module('ssacpos')
	.controller('reportsCtrl', reportsCtrl);

reportsCtrl.$inject = ['$window','$location','$scope','$compile','sppreport','ipreport','bsreport','dsreport','tpreport','streport'];

function reportsCtrl($window,$location,$scope,$compile,sppreport,ipreport,bsreport,dsreport,tpreport,streport) {
	var vm = this;
	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 2
	})

	vm.formatDate = function(date,type){
		if(type === "date"){
			return moment(date).format("MM-DD-YYYY");
		}else{
			return moment(date).format("MM-DD-YYYY hh:mm A");
		}
	}
	sppreport.getListofSppReports().then(function(response){
		vm.sppreports = response.data;
		console.log(vm.sppreports);
	});
	ipreport.getListofIpReports().then(function(response){
		vm.ipreports = response.data;
		console.log(vm.ipreports);
	})
	bsreport.getListofBsReports().then(function(response){
		vm.bsreports = response.data;
		console.log(vm.bsreports);
	})
	dsreport.getListofDsReports().then(function(response){
		vm.dsreports = response.data;
		console.log(vm.dsreports);
	})
	tpreport.getListofTpReports().then(function(response){
		vm.tpreports = response.data;
		console.log(vm.tpreports);
	})
	streport.getListofStReports().then(function(response){
		vm.streports = response.data;
		console.log(vm.streports);
	})
	// vm.readOne = function(invoiceid){
	// 	console.log(vm.invoices);
	// 	for (var i = 0; i < vm.invoices.length; i++) {
	// 		if(vm.invoices[i]._id === invoiceid){
	// 			vm.clickedInvoice = vm.invoices[i];
	// 			var items = [];
	// 			var labors =  [];
	// 			var others = [];
	// 			for(item in vm.clickedInvoice.items){
	// 				if(vm.clickedInvoice.items[item] != null){
	// 					items.push(vm.clickedInvoice.items[item]);
	// 				}
	// 				console.log(vm.clickedInvoice.items[item]);
	// 			}
	// 			vm.clickedInvoice.items = items;
	// 			for(labor in vm.clickedInvoice.labors){
	// 				if(vm.clickedInvoice.labors[labor] != null){
	// 					labors.push(vm.clickedInvoice.labors[labor]);
	// 				}
	// 				console.log(vm.clickedInvoice.labors[labor]);
	// 			}
	// 			vm.clickedInvoice.labors = labors;
	// 			for(other in vm.clickedInvoice.others){
	// 				if(vm.clickedInvoice.others[other] != null){
	// 					others.push(vm.clickedInvoice.others[other]);
	// 				}
	// 				console.log(vm.clickedInvoice.others[other]);
	// 			}
	// 			vm.clickedInvoice.others = others;
	// 			console.log(vm.clickedInvoice);
	// 		}
	// 	}
	// }
};
})();