angular.module('foodsaver').controller('indexController', [ '$scope', '$http', 'FsConfigService', 'FsLoggerService', function ( $scope, $http, fsConfig, fsLogger ) {
    $scope.data = "login page data";
} ] );