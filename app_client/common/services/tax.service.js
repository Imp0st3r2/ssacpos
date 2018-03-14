(function () {
	angular
		.module('ssacpos')
		.service('tax', tax);

	tax.$inject = ['$window','$http'];
	function tax ($window,$http) {
		var getTaxRate = function(){
			return $http.get('/api/taxrate');
		}
		return {
			getTaxRate : getTaxRate
		};
	}
}) ();