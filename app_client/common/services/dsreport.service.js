(function () {
	angular
		.module('ssacpos')
		.service('dsreport', dsreport);

	dsreport.$inject = ['$window','$http'];
	function dsreport ($window,$http) {
		var currentDsReport = {};
		var getListofDsReports = function(){
			return $http.get('/api/dsreports');
		};
		var getDsReportById = function(reportid){
			return $http.get('/api/dsreports/'+reportid);
		};
		var createDsReport = function(dsreport){
			return $http.post('/api/dsreports',dsreport);
		};
		var editDsReport = function(dsreport){
			return $http.put('/api/dsreports/'+dsreport._id,dsreport);
		};
		var deleteDsReport = function(reportid){
			return $http.delete('/api/dsreports/'+reportid);
		};
		var setDsReport = function(dsreport){
			currentDsReport = dsreport;
			console.log(currentDsReport);
		};
		var getDsReport = function(){
			return currentDsReport;
		};
		return {
			getListofDsReports : getListofDsReports,
			getDsReportById : getDsReportById,
			createDsReport : createDsReport,
			editDsReport : editDsReport,
			deleteDsReport : deleteDsReport,
			setDsReport : setDsReport,
			getDsReport : getDsReport
		};
	}
}) ();