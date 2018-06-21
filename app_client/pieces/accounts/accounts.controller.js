(function(){
angular
	.module('ssacpos')
	.controller('accountsCtrl', accountsCtrl);

accountsCtrl.$inject = ['$location','$scope','$compile','account', 'invoice'];

function accountsCtrl ($location,$scope,$compile, account, invoice) {
	var vm = this;
	vm.getInvoices = function(){
		invoice.getInvoiceList().then(function(response){
			vm.invoices = response.data;
			vm.invoices.sort(function(a,b){
				var c = new Date(a.datecreated);
				var d = new Date(b.datecreated);
				return d-c;
			})
			for(var i = 0;i<vm.invoices.length;i++){
				var tempinvoice = vm.invoices[i];
				var idate = tempinvoice.datecreated.split('T');
				idate = idate[0].split('-');
				idate = idate[1] + "-" + idate[2] + "-" + idate[0];
				tempinvoice.datecreated = idate;
				// vm.invoices[i].datecreated = tempinvoice.datecreated;
			}
		});
	}
	account.getAccountList().then(function(response){
		console.log(response);
		vm.accounts = response.data;
		console.log(vm.accounts);
		vm.getInvoices();
	})
	vm.addAccount = function(){
		$(".data-container").empty();
		var stringToAppend = "<div class='col-xs-12 piece'><accountcreate></accountcreate></div>";
		var el = angular.element(stringToAppend)
		$(".data-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.readOne = function(accountid){
		console.log(vm.accounts);
		vm.currentInvoices = [];
		for (var i = 0; i < vm.accounts.length; i++) {
			if(vm.accounts[i]._id === accountid){
				vm.clickedAccount = vm.accounts[i];
				console.log(vm.clickedAccount);
			}
		}
		for(var i=0;i<vm.invoices.length;i++){
			console.log(vm.clickedAccount._id);
			console.log(vm.invoices[i].account._id);
			if(vm.invoices[i].account._id === vm.clickedAccount._id){
				vm.currentInvoices.push(vm.invoices[i]);
			}
		}
	}
	vm.editAccount = function(accountid){
		vm.account = {
			id : accountid
		}
		account.setAccount(vm.account);
		$(".data-container").empty();
		var stringToAppend = "<div class='col-xs-12 piece'><accountedit></accountedit></div>";
		var el = angular.element(stringToAppend)
		$(".data-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.deleteAccount = function(accountid){
		account.deleteAccount(accountid).then(function(response){
			vm.accounts = response.data;
		})
	}
};
})();