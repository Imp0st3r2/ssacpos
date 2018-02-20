(function () {
	angular
		.module('ssacpos')
		.service('authentication', authentication);

	authentication.$inject = ['$window','$http'];
	function authentication ($window,$http) {
		var saveToken = function(token) {
			$window.localStorage['ssacpos-token'] = token;
		};

		var getToken = function() {
			return $window.localStorage['ssacpos-token'];
		};
		var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
		var register = function(user) {
			console.log(user);
			return $http.post('/api/register', user).then(function successCallback(success){
				console.log("successfull");
				console.log(success);
				saveToken(success.data.token);
			}, function errorCallback(response){
				return response;
			});
		};

		var login = function(user) {
			return $http.post('/api/login', user).then(function(success){
				saveToken(success.data.token);
			});
		};

		var logout = function() {
			$window.localStorage.removeItem('ssacpos-token');
		};

		var isLoggedIn = function() {
			var token = getToken();
			if(token){
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};

		var currentUser = function() {
			if(isLoggedIn()){
				var token = getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return {
					email : payload.email,
					name : payload.name,
					status : payload.status
				};
			}
		};
		
		return {
			saveToken : saveToken,
			getToken : getToken,
			register : register,
			login : login,
			logout : logout,
			isLoggedIn : isLoggedIn,
			currentUser : currentUser
		};
	}
}) ();