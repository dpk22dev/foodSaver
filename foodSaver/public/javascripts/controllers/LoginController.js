angular.module('foodsaver').controller('loginController', [ '$scope', '$http', 'FsConfigService', 'FsLoggerService', function ( $scope, $http, fsConfig, fsLogger ) {
    $scope.data = "login page data";
} ] );