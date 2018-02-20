/*****NAME YOUR APP HERE V*****/
angular.module('ssacpos', ['ngRoute', 'ngSanitize']);

/*****ADD ANGULAR ROUTES*******/
function config ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/home/home.view.html',
			controller: 'homepageCtrl',
			controllerAs: 'vm'
		})
		.when('/dashboard', {
			templateUrl: '/dashboard/dashboard.view.html',
			controller: 'dashboardCtrl',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});

	/******REMOVE # FROM URL******/
	$locationProvider.hashPrefix('');
	$locationProvider.html5Mode({
            enabled: true,
            requireBase: true,
            rewriteLinks: false
	});
}

angular
	.module('ssacpos')
	.config(['$routeProvider', '$locationProvider', config])