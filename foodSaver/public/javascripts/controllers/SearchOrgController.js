angular.module('foodsaver').controller('searchOrgController', [ '$scope', '$http', 'FsConfigService', 'FsLoggerService', 'orgCrudService', function ( $scope, $http, fsConfigs, fsLogger, orgCrudService ) {

    $scope.viewData = {};
    $scope.modesArr = fsConfigs.contactModesArr;
    $scope.viewData.contMode = fsConfigs.contactModesArr[0];

    $scope.orgTypeArr = fsConfigs.orgTypeArr;
    $scope.viewData.orgType =  fsConfigs.orgTypeArr[0];

    $scope.orgForArr = fsConfigs.orgForArr;
    $scope.viewData.orgFor = fsConfigs.orgForArr[0];

    $scope.orgDataArr = [];

    $scope.notification = [];
    $scope.notifMsg = "";

    $scope.init = function ( ) {
        //@todo set lon, lat of current location
    }

    $scope.init();

    $scope.getNotification = function ( ) {
        notifMsg = "";
        if(typeof array != "undefined" && array != null && array.length > 0) {
            $scope.notification.forEach(function (obj) {
                if ('warning' === obj.type) {
                    notifMsg += obj.reason;
                }
            });
        }
        return notifMsg;
    }

    $scope.searchNearbyOrgs = function ( ) {
        //console.log( $scope.viewData );
        //var orgObj = orgCrudService.orgObjectForPostData( $scope.viewData );

        orgCrudService.searchNearbyOrgs( $scope.viewData, function ( response ) {

            if (response.status === 200){
                // fill data in result panel
                //$scope.returnedOrgData = response.data;
                if( typeof response.data != "undefined" && response.data != null && response.data.length > 0 ){
                    $scope.orgDataArr = [];
                    response.data.forEach( function ( obj ) {
                        $scope.orgDataArr.push( orgCrudService.getViewDataInitWhenEmpty( obj ) );
                    });
                }else{
                    //@todo set some msg to show error in getting response on view
                    $scope.notification.push( { "type":"warning", "reason": "empty response from server" } );
                }
            }else{
                //show message reason for failure
                $scope.notification.push( { "type":"warning", "reason": "Error in getting response from server" } );
            }
        });

    }

} ] );