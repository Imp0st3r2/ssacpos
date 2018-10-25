(function () {
	angular
		.module('ssacpos')
		.service('install', install);

	install.$inject = ['$window','$http'];
	function install ($window,$http) {
		var currentInstall = {};
		var getInstalls = function(){
			return $http.get('/api/labors');
		}
		var getInstallById = function(installid){
			return $http.get('/api/labors/'+installid);
		}
		var createInstall = function(install){
			return $http.post('/api/labors',install);
		}
		var deleteInstall = function(install){
			console.log(install);
			return $http.delete('/api/labors/'+install.id);
		}
		var updateInstall = function(install){
			return $http.put('/api/labors/'+install._id,install)
		}
		var setInstall = function(install){
			currentInstall = install;
		}
		var recallInstall = function(){
			return currentInstall;
		}
		return {
			getInstalls : getInstalls,
			getInstallById : getInstallById,
			createInstall : createInstall,
			deleteInstall : deleteInstall,
			updateInstall : updateInstall,
			setInstall : setInstall,
			recallInstall : recallInstall
		};
	}
}) ();