angular.module('foodsaver').controller('donateMealController', [ '$scope', '$http', 'FsConfigService', 'FsLoggerService', 'mealCrudService', function ( $scope, $http, fsConfigs, fsLogger, mealCrudService ) {
    $scope.viewData = {};
    $scope.mealData = {};
    $scope.id = "3";

    
    
    $scope.init = function ( ) {
        //@todo get id from cookie or whatever
        //@todo get default contact mode, quantity, pickup address, pickup coord, timings form cacheservice
        $scope.viewData = mealCrudService.getAddMealViewData();
    }
    $scope.init();

}]);