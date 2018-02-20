(function () {
	angular
		.module('ssacpos')
		.service('user', user);

	user.$inject = ['$window','$http'];
	function user ($window,$http) {
		var currentUser = {};
		var getUsers = function(){
			return $http.get('/api/users');
		}
		var getUser = function(user){
			return $http.get('/api/users/'+user.id);
		}
		var createUser = function(user){
			return $http.post('/api/users',user);
		}
		var deleteUser = function(user){
			return $http.delete('/api/users/'+user.id);
		}
		var updateUser = function(user){
			return $http.put('/api/users/'+user.id,user)
		}
		var updatePassword = function(user){
			console.log(user);
			return $http.post('/api/users/resetpassword',user);
		}
		var setUser = function(user){
			currentUser = user;
		}
		var recallUser = function(){
			return currentUser;
		}
		return {
			getUsers : getUsers,
			getUser : getUser,
			createUser : createUser,
			deleteUser : deleteUser,
			updateUser : updateUser,
			updatePassword : updatePassword,
			setUser : setUser,
			recallUser : recallUser
		};
	}
}) ();