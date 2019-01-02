(function(){
angular
	.module('ssacpos')
	.controller('spiffcreateCtrl', spiffcreateCtrl);

spiffcreateCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'spiff'];

function spiffcreateCtrl($location, $scope, $compile, authentication, spiff) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	vm.newSpiff = {
		name : "",
		amount : 0
	};
	if(vm.isLoggedIn){
		vm.submitSpiff = function(){
			console.log($("#spiff-name").val());
			console.log(vm.newSpiff);
			if(vm.newSpiff.name != ""){
				if(vm.newSpiff.amount != ""){
					vm.formError = "";
					if(!vm.formError){
						spiff.createSpiff(vm.newSpiff).then(function(response){
							$(".dialogbox").empty();
							var appendString = "<div class='row'>"
											 +  "<div class='col-xs-12'>"
											 + 	 "<p>"+response.data+"</p>"
											 +	"</div>"
											 + "</div>"
											 + "<div class='row'>"
											 +	"<div class='col-xs-3'></div>"
											 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='svm.showList();'>OK</button></div>"
											 +	"<div class='col-xs-3'></div>"; 
							var el = angular.element(appendString)
							$(".dialogbox").append(el);
							compiled = $compile(el);
							compiled($scope);
							console.log(response);
							$(".dialogbox").show();
						},function(err){
							console.log(err);
							var message = "";
							if(err){
								message = "There was an error creating the spiff.";
							}
							vm.formError = message;
						})
					}
				}else{
					vm.formError = "You must supply a spiff amount."
					console.log(vm.newUser);
				}
			}else{
				vm.formError = "You must supply a spiff name.";
				console.log(vm.newUser);
			}
		}
		vm.showList = function(){
			$(".dialogbox").hide();
			$(".spiffs-container").empty();
			var stringToAppend = "<div class='col-xs-12'><spifflist></spifflist></div>";
			var el = angular.element(stringToAppend)
			$(".spiffs-container").append(el);
			compiled = $compile(el);
			compiled($scope);
		}
	}else{
		$location.path('/home');
	}
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	}
};
})();