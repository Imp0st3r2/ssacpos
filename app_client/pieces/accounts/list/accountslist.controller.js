(function(){
angular
	.module('ssacpos')
	.controller('accountslistCtrl', accountslistCtrl);

accountslistCtrl.$inject = ['$location','$scope','$compile','account', 'invoice', 'exportservice'];

function accountslistCtrl ($location,$scope,$compile, account, invoice, exportservice) {
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
		// console.log(vm.accounts);
		vm.getInvoices();
	})
	vm.addAccount = function(){
		$(".accounts-container").empty();
		var stringToAppend = "<div class='col-xs-12'><accountcreate></accountcreate></div>";
		var el = angular.element(stringToAppend)
		$(".accounts-container").append(el);
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
			// console.log(vm.clickedAccount._id);
			// console.log(vm.invoices[i].account._id);
			if(vm.invoices[i].account._id === vm.clickedAccount._id){
				vm.currentInvoices.push(vm.invoices[i]);
			}
		}
	}
	vm.cancel = function(){
		$(".dialogbox").hide();
	}
	vm.editAccount = function(accountid){
		vm.account = {
			id : accountid
		}
		account.setAccount(vm.account);
		$(".accounts-container").empty();
		var stringToAppend = "<div class='col-xs-12'><accountedit></accountedit></div>";
		var el = angular.element(stringToAppend)
		$(".accounts-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}

	vm.exportAccounts = function(){
		exportservice.exportCSV(vm.accounts,"Accounts").then(function(response){
			console.log(response);
			$(".dialogbox").empty();
			var appendString = "<div class='row'>"
							 +  "<div class='col-xs-12'>"
							 + 	 "<p>" + response.data
							 +   "</p>"
							 +	"</div>"
							 + "</div>"
							 + "<div class='row'>"
							 +	"<div class='col-xs-3'></div>"
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='avm.showList();'>OK</button></div>"
							 +	"<div class='col-xs-3'></div>"; 
			var el = angular.element(appendString)
			$(".dialogbox").append(el);
			compiled = $compile(el);
			compiled($scope);
			$(".dialogbox").show();
		})
	}
	vm.showList = function(){
		$(".dialogbox").hide();
		$(".accounts-container").empty();
		var stringToAppend = "<div class='col-xs-12'><accountslist></accountslist></div>";
		var el = angular.element(stringToAppend)
		$(".accounts-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.deleteAccount = function(accountid){
		vm.account = {
			id : accountid
		}
		for(var i=0;i<vm.accounts.length;i++){
			var accountName = vm.accounts[i].firstname + " " + vm.accounts[i].lastname;
			if(vm.accounts[i]._id === accountid){
				vm.account.name = accountName;
			}
		}
		$(".dialogbox").empty();
		var appendString = "<div class='row'>"
						 +  "<div class='col-xs-12'>"
						 + 	 "<p>Are you sure you would like to delete: <br>"+vm.account.name+"</p>"
						 +	"</div>"
						 + "</div>"
						 + "<div class='row'>"
						 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='avm.confirmDelete();'>Yes</button></div>"
						 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='avm.cancel();'>No</button></div>"
						 + "</div>"; 
		var el = angular.element(appendString)
		$(".dialogbox").append(el);
		compiled = $compile(el);
		compiled($scope);
		$(".dialogbox").show();
	}
	vm.confirmDelete = function(){
		console.log(vm.account);
		account.deleteAccount(vm.account.id).then(function(response){
			console.log(response);
			$(".dialogbox").hide();
			$(".dialogbox").empty();
			var appendString = "<div class='row'>"
							 +  "<div class='col-xs-12'>"
							 + 	 "<p>"+response.data+"</p>"
							 +	"</div>"
							 + "</div>"
							 + "<div class='row'>"
							 +	"<div class='col-xs-3'></div>"
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='avm.showList();'>OK</button></div>"
							 +	"<div class='col-xs-3'></div>"; 
			var el = angular.element(appendString)
			$(".dialogbox").append(el);
			compiled = $compile(el);
			compiled($scope);
			$(".dialogbox").show();
		})
	}
};
})();