(function () {
	angular
		.module('ssacpos')
		.service('streport', streport);

	streport.$inject = ['$window','$http'];
	function streport ($window,$http) {
		var getListofStReports = function(){
			return $http.get('/api/streports');
		};
		var getStReportById = function(reportid){
			return $http.get('/api/streports/'+reportid);
		};
		var createStReport = function(streport){
			return $http.post('/api/streports',streport);
		};
		var editStReport = function(streport){
			return $http.put('/api/streports/'+streport._id,streport);
		};
		var deleteStReport = function(reportid){
			return $http.delete('/api/streports/'+reportid);
		};
		return {
			getListofStReports : getListofStReports,
			getStReportById : getStReportById,
			createStReport : createStReport,
			editStReport : editStReport,
			deleteStReport : deleteStReport
		};
	}
}) ();