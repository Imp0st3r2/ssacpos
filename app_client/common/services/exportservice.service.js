(function () {
	angular
		.module('ssacpos')
		.service('exportservice', exportservice);

	exportservice.$inject = ['$window','$http'];
	function exportservice ($window,$http) {
		var exportCSV = function(jsonData,csvname){
			return $http.post('/api/exportCSV/'+csvname,jsonData);
		}
		
		return {
			exportCSV : exportCSV
		};
	}
}) ();