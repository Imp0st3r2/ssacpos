(function(){
angular
	.module('ssacpos')
	.controller('userlistCtrl', userlistCtrl);

userlistCtrl.$inject = ['$location', '$scope', '$compile', 'authentication', 'user', 'exportservice'];

function userlistCtrl($location, $scope, $compile, authentication, user, exportservice) {
	var vm = this;
	vm.isLoggedIn = authentication.isLoggedIn();
	if(vm.isLoggedIn){
		user.getUsers().then(function(response){
			vm.users = response.data;
			console.log(response);
		})
	}else{
		$location.path('/home');
	}
	vm.deleteUser = function(userid,username){
		vm.user = {
			id : userid,
			name : username
		}
		$(".dialogbox").empty();
		var appendString = "<div class='row'>"
						 +  "<div class='col-xs-12'>"
						 + 	 "<p>Are you sure you would like to delete: <br>"+username+"</p>"
						 +	"</div>"
						 + "</div>"
						 + "<div class='row'>"
						 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='uvm.confirmDelete();'>Yes</button></div>"
						 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='uvm.cancel();'>No</button></div>"
						 + "</div>"; 
		var el = angular.element(appendString)
		$(".dialogbox").append(el);
		compiled = $compile(el);
		compiled($scope);
		$(".dialogbox").show();
	}
	vm.editUser = function(userid, username){
		console.log(userid);
		console.log(username);
		vm.user = {
			id : userid,
			name : username
		}
		user.setUser(vm.user);
		$(".users-container").empty();
		var stringToAppend = "<div class='col-xs-12'><useredit></useredit></div>";
		var el = angular.element(stringToAppend)
		$(".users-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.confirmDelete = function(){
		console.log(vm.user);
		user.deleteUser(vm.user).then(function(response){
			console.log(response);
			$(".dialogbox").hide();
			$(".dialogbox").empty();
			var appendString = "<div class='row'>"
							 +  "<div class='col-xs-12'>"
							 + 	 "<p>"+response.data+"</p>"
							 +	"</div>"
							 + "</div>"
							 + "<div class='row'>"
							 +	"<div class='col-xs-3'></div>"
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='uvm.showList();'>OK</button></div>"
							 +	"<div class='col-xs-3'></div>"; 
			var el = angular.element(appendString)
			$(".dialogbox").append(el);
			compiled = $compile(el);
			compiled($scope);
			$(".dialogbox").show();
		})
	}
	vm.cancel = function(){
		$(".dialogbox").hide();
	}
	vm.addUser = function() {
		$(".users-container").empty();
		var stringToAppend = "<div class='col-xs-12'><usercreate></usercreate></div>";
		var el = angular.element(stringToAppend)
		$(".users-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}

	vm.exportUsers = function(){
		exportservice.exportCSV(vm.users,"Users").then(function(response){
			console.log(response);
			$(".dialogbox").empty();
			var appendString = "<div class='row'>"
							 +  "<div class='col-xs-12'>"
							 + 	 "<p>" + response.data
							 +   "</p>"
							 +	"</div>"
							 + "</div>"
							 + "<div class='row'>"
							 +	"<div class='col-xs-3'></div>"
							 +	"<div class='col-xs-6'><button class='btn btn-primary btn-full' type='button' ng-click='uvm.showList();'>OK</button></div>"
							 +	"<div class='col-xs-3'></div>"; 
			var el = angular.element(appendString)
			$(".dialogbox").append(el);
			compiled = $compile(el);
			compiled($scope);
			$(".dialogbox").show();
		})
	}
	vm.showList = function(){
		$(".dialogbox").hide();
		$(".users-container").empty();
		var stringToAppend = "<div class='col-xs-12'><userlist></userlist></div>";
		var el = angular.element(stringToAppend)
		$(".users-container").append(el);
		compiled = $compile(el);
		compiled($scope);
	}
	vm.logout = function() {
		authentication.logout();
		$location.path('/home');
	}
};
})();