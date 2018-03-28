(function(){
angular
	.module('ssacpos')
	.controller('accountsCtrl', accountsCtrl);

accountsCtrl.$inject = ['$location','$scope','$compile','account'];

function accountsCtrl ($location,$scope,$compile, account) {
	var vm = this;
	account.getAccountList().then(function(response){
		console.log(response);
		vm.accounts = response.data;
		console.log(vm.accounts);
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
		for (var i = 0; i < vm.accounts.length; i++) {
			if(vm.accounts[i]._id === accountid){
				vm.clickedAccount = vm.accounts[i];
				console.log(vm.clickedAccount);
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