(function () {
	angular
		.module('ssacpos')
		.service('tpreport', tpreport);

	tpreport.$inject = ['$window','$http'];
	function tpreport ($window,$http) {
		var getListofTpReports = function(){
			return $http.get('/api/tpreports');
		};
		var getTpReportById = function(reportid){
			return $http.get('/api/tpreports/'+reportid);
		};
		var createTpReport = function(tpreport){
			return $http.post('/api/tpreports',tpreport);
		};
		var editTpReport = function(tpreport){
			return $http.put('/api/tpreports/'+tpreport._id,tpreport);
		};
		var deleteTpReport = function(reportid){
			return $http.delete('/api/tpreports/'+reportid);
		};
		return {
			getListofTpReports : getListofTpReports,
			getTpReportById : getTpReportById,
			createTpReport : createTpReport,
			editTpReport : editTpReport,
			deleteTpReport : deleteTpReport
		};
	}
}) ();