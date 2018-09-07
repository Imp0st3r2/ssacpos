(function () {
	angular
		.module('ssacpos')
		.service('spiff', spiff);

	spiff.$inject = ['$window','$http'];
	function spiff ($window,$http) {
		var currentSpiff = {};
		var getSpiffs = function(){
			return $http.get('/api/spiffs');
		}
		var getSpiff = function(spiff){
			return $http.get('/api/spiffs/'+spiff.id);
		}
		var createSpiff = function(spiff){
			return $http.post('/api/spiffs',spiff);
		}
		var deleteSpiff = function(spiff){
			return $http.delete('/api/spiffs/'+spiff.id);
		}
		var updateSpiff = function(spiff){
			return $http.put('/api/spiffs/'+spiff.id,spiff)
		}
		var setSpiff = function(spiff){
			currentSpiff = spiff;
		}
		var recallSpiff = function(){
			return currentSpiff;
		}
		return {
			getSpiffs : getSpiffs,
			getSpiff : getSpiff,
			createSpiff : createSpiff,
			deleteSpiff : deleteSpiff,
			updateSpiff : updateSpiff,
			setSpiff : setSpiff,
			recallSpiff : recallSpiff
		};
	}
}) ();