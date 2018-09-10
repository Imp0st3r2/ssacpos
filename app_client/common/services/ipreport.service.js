(function () {
	angular
		.module('ssacpos')
		.service('ipreport', ipreport);

	ipreport.$inject = ['$window','$http'];
	function ipreport ($window,$http) {
		var getListofIpReports = function(){
			return $http.get('/api/ipreports');
		};
		var getIpReportById = function(reportid){
			return $http.get('/api/ipreports/'+reportid);
		};
		var createIpReport = function(ipreport){
			return $http.post('/api/ipreports',ipreport);
		};
		var editIpReport = function(ipreport){
			return $http.put('/api/ipreports/'+ipreport._id,ipreport);
		};
		var deleteIpReport = function(reportid){
			return $http.delete('/api/ipreports/'+reportid);
		};
		return {
			getListofIpReports : getListofIpReports,
			getIpReportById : getIpReportById,
			createIpReport : createIpReport,
			editIpReport : editIpReport,
			deleteIpReport : deleteIpReport
		};
	}
}) ();