(function () {
	angular
		.module('ssacpos')
		.service('account', account);

	account.$inject = ['$window','$http'];
	function account ($window,$http) {
		var currentAccount = {};
		var getAccountList = function(){
			return $http.get('/api/accounts');
		};
		var getAccountById = function(accountid){
			return $http.get('/api/accounts/'+accountid);
		}
		var createAccount = function(caccount){
			return $http.post('/api/accounts',caccount);
		};
		var updateAccount = function(caccount){
			return $http.put('/api/accounts/'+caccount._id,caccount);
		}
		var deleteAccount = function(accountid){
			return $http.delete('/api/accounts/'+accountid);
		}
		var setAccount = function(account){
			currentAccount = account;
		}
		var recallAccount = function(){
			return currentAccount;
		}
		return {
			getAccountList : getAccountList,
			getAccountById : getAccountById,
			createAccount : createAccount,
			updateAccount : updateAccount,
			deleteAccount : deleteAccount,
			setAccount : setAccount,
			recallAccount : recallAccount
		};
	}
}) ();