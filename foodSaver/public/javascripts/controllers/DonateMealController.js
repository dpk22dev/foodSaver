angular.module('foodsaver').controller('donateMealController', [ '$scope', '$http', 'FsConfigService', 'FsLoggerService', 'mealCrudService', function ( $scope, $http, fsConfigs, fsLogger, mealCrudService ) {
    $scope.viewData = {};
    $scope.mealData = {};
    $scope.id = "3";

    $scope.modesArr = fsConfigs.contactModesArr;
    $scope.foodTypeArr= fsConfigs.foodTypeArr;
    $scope.orgForArr = fsConfigs.orgForArr;
    $scope.refrigArr = fsConfigs.refrigArr;

    $scope.saveMeal = function ( ) {

        mealCrudService.updateMealData( $scope.viewData, function ( response ) {

            if (response.status === 200){
                //call again to refill updated data
                // show in notification about meal getting posted
                $scope.notification.push( { "type":"success", "reason": "empty response from server" } );
            }else{
                //show message reason for failure
                // show in notification about meal not getting posted
                $scope.notification.push( { "type":"warning", "reason": "Error in posting meal data." } );
            }
        });
    }

    $scope.init = function ( ) {
        //@todo get id from cookie or whatever
        //@todo get default contact mode, quantity, pickup address, pickup coord, timings form cacheservice
        $scope.viewData = mealCrudService.getAddMealViewData( $scope.id );
    }
    $scope.init();

}]);