(function () {
	angular
		.module('ssacpos')
		.service('bsreport', bsreport);

	bsreport.$inject = ['$window','$http'];
	function bsreport ($window,$http) {
		var currentBsReport = {};
		var getListofBsReports = function(){
			return $http.get('/api/bsreports');
		};
		var getBsReportById = function(reportid){
			return $http.get('/api/bsreports/'+reportid);
		};
		var createBsReport = function(bsreport){
			return $http.post('/api/bsreports',bsreport);
		};
		var editBsReport = function(bsreport){
			return $http.put('/api/bsreports/'+bsreport._id,bsreport);
		};
		var deleteBsReport = function(reportid){
			return $http.delete('/api/bsreports/'+reportid);
		};
		var setBsReport = function(bsreport){
			currentBsReport = bsreport;
			console.log(currentBsReport);
		};
		var getBsReport = function(){
			return currentBsReport;
		};
		return {
			getListofBsReports : getListofBsReports,
			getBsReportById : getBsReportById,
			createBsReport : createBsReport,
			editBsReport : editBsReport,
			deleteBsReport : deleteBsReport,
			setBsReport : setBsReport,
			getBsReport : getBsReport
		};
	}
}) ();