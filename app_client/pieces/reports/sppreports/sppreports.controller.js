(function(){
angular
	.module('ssacpos')
	.controller('sppreportsCtrl', sppreportsCtrl);

sppreportsCtrl.$inject = ['$window','$location','$scope','$compile','sppreport','authentication'];

function sppreportsCtrl($window,$location,$scope,$compile,sppreport,authentication) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		sppreport.getListofSppReports().then(function(response){
			vm.sppreports = response.data;
			console.log(vm.sppreports);
		});
		vm.createSppReport = function() {
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><sppreportcreate></sppreportcreate></div>";
			var el = angular.element(stringToAppend)	
			$(".data-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
		vm.deleteInvoice = function(invoiceid) {
			vm.invoice = {
				id : invoiceid
			}
			$(".dialogbox").empty();
			var appendString = "<div class='row'>"
							 +  "<div class='col-xs-12'>"
							 + 	 "<p>Are you sure you would like to delete this invoice?</p>"
							 +	"</div>"
							 + "</div>"
							 + "<div class='row'>"
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='ivm.confirmDelete();'>Yes</button></div>"
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='ivm.cancel();'>No</button></div>"
							 + "</div>"; 
			var el = angular.element(appendString)
			$(".dialogbox").append(el);
			compiled = $compile(el);
			compiled($scope);
			$(".dialogbox").show();
			$("#invoiceModal").modal('hide');
		}
		vm.readOne = function(invoiceid){
			console.log(vm.invoices);
			for (var i = 0; i < vm.invoices.length; i++) {
				if(vm.invoices[i]._id === invoiceid){
					vm.clickedInvoice = vm.invoices[i];
					var items = [];
					var labors =  [];
					var others = [];
					for(item in vm.clickedInvoice.items){
						if(vm.clickedInvoice.items[item] != null){
							items.push(vm.clickedInvoice.items[item]);
						}
						console.log(vm.clickedInvoice.items[item]);
					}
					vm.clickedInvoice.items = items;
					for(labor in vm.clickedInvoice.labors){
						if(vm.clickedInvoice.labors[labor] != null){
							labors.push(vm.clickedInvoice.labors[labor]);
						}
						console.log(vm.clickedInvoice.labors[labor]);
					}
					vm.clickedInvoice.labors = labors;
					for(other in vm.clickedInvoice.others){
						if(vm.clickedInvoice.others[other] != null){
							others.push(vm.clickedInvoice.others[other]);
						}
						console.log(vm.clickedInvoice.others[other]);
					}
					vm.clickedInvoice.others = others;
					console.log(vm.clickedInvoice);
				}
			}
		}
		vm.editInvoice = function(invoiceid){
			vm.invoice = {
				id : invoiceid
			}
			invoice.setInvoice(vm.invoice);
			$(".data-container").empty();
			var stringToAppend = "<div class='col-xs-12 piece'><invoiceedit></invoiceedit></div>";
			var el = angular.element(stringToAppend)
			$(".data-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
		vm.confirmDelete = function(){
			invoice.deleteInvoice(vm.invoice.id).then(function(response){
				console.log(response);
				$(".dialogbox").hide();
				vm.closedinvoices = [];
				vm.openinvoices = [];
				invoice.getInvoiceList().then(function(response){
					vm.invoices = response.data;
					for(var i = 0;i<vm.invoices.length;i++){
						if(vm.invoices[i].paid === true){
							vm.closedinvoices.push(vm.invoices[i]);
						}else{
							vm.openinvoices.push(vm.invoices[i]);
						}
					}
					console.log(response);
				})
			})
		}
		vm.cancel = function(){
			$(".dialogbox").hide();
		}
		vm.makePayment = function(){
			$(document).ready(function() {
			    $('#paymentModal').on('hidden.bs.modal', function(){
			        $(this).find('form')[0].reset();
			     });
			});
			// $("#paymentModal").modal('hide');
			console.log(vm.payment);
			var payment = {
				amountpaid : vm.payment
			}
			invoice.makePayment(vm.clickedInvoice._id,payment).then(function(response){
				vm.clickedInvoice = response.data;
				if(vm.clickedInvoice.totalafterpayments <= 0){
					console.log("marking paid");
					invoice.markedPaid(vm.clickedInvoice._id).then(function(response){
						vm.clickedInvoice = response.data;
						var index = vm.openinvoices.findIndex(function(x){return x._id === vm.clickedInvoice._id});
						vm.closedinvoices.push(vm.openinvoices[index]);
						vm.openinvoices.splice(index,1);
					})
				}
			})
			// $("#paymentModal").on('hidden', function(){
			// 	$("#invoiceModal").modal('show');
			// })
			console.log(vm.clickedInvoice);
		}

		vm.printInvoice = function(){
			$window.open("/invoices/"+vm.clickedInvoice._id,"_blank");
		}
	}else{
		$location.path('/home');
	}
};
})();