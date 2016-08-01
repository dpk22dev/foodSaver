var webroApp = angular.module('foodsaver', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'ngCookies', 'LocalStorageModule']);

webroApp.config( function ($routeProvider) {

    $routeProvider
        .when('/login', {
            templateUrl : '/tmpl/login.html',
            controller  : 'loginController'
        })
        .when('/profile', {
            templateUrl : '/tmpl/profile.html',
            controller  : 'profileController'
        })
        .when('/search', {
            templateUrl : '/tmpl/search.html',
            controller  : 'searchController'
        })
});

/*webroApp.run(['$rootScope', '$location', 'auth', function ($rootScope, $location, auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if( !auth.isEditor() ){
            $location.url('/#');
        }
    });
}]);*/

/*webroApp.run(['$rootScope', localStorageService, function ($rootScope, localStorageService ) {
 localStorageService.getChannelList();
 }]);*/

/*
angular.module('webro').factory('logTimeTaken', [function() {
    var logTimeTaken = {
        request: function(config) {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function(response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return logTimeTaken;
}]);

webroApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('logTimeTaken');
}]);
*/
