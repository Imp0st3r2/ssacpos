(function () {
	angular
		.module('ssacpos')
		.service('sppreport', sppreport);

	sppreport.$inject = ['$window','$http'];
	function sppreport ($window,$http) {
		var currentSppReport = {};
		var getListofSppReports = function(){
			return $http.get('/api/sppreports');
		};
		var getSppReportById = function(reportid){
			return $http.get('/api/sppreports/'+reportid);
		};
		var createSppReport = function(sppreport){
			return $http.post('/api/sppreports',sppreport);
		};
		var editSppReport = function(sppreport){
			return $http.put('/api/sppreports/'+sppreport._id,sppreport);
		};
		var deleteSppReport = function(reportid){
			return $http.delete('/api/sppreports/'+reportid);
		};
		var setSppReport = function(sppreport){
			currentSppReport = sppreport;
		};
		var getSppReport = function(){
			return currentSppReport;
		};
		return {
			getListofSppReports : getListofSppReports,
			getSppReportById : getSppReportById,
			createSppReport : createSppReport,
			editSppReport : editSppReport,
			deleteSppReport : deleteSppReport,
			setSppReport : setSppReport,
			getSppReport : getSppReport
		};
	}
}) ();