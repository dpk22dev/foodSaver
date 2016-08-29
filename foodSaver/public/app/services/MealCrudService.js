angular.module('app').factory('mealCrudService', ['$http', 'FsConfigService', 'FsLoggerService', function( $http, fsConfigs, fsLogger ){

    var getAddMealViewData = function ( donId ) {
        //@todo below settings should be based on user org preferences if he is donor
        var res = {};
        res.orgId = donId;
        res.contMode = fsConfigs.defaultContactMode.value;
        res.foodType = fsConfigs.defaultFoodType.value;
        res.quantity = fsConfigs.defaultDonationQuantity.value;
        res.mealFor = fsConfigs.defaultOrgFor.value;
        res.mealForName = fsConfigs.defaultForName;
        res.foodInfo = "";
        res.street= "";
        res.city = "";
        res.state = "";
        res.zip = "";
        res.lon = "";
        res.lat = "";
        res.startPickTime = "";
        res.endPickTime = "";
        res.comment = "";
        res.refrig = "";
        res.estExpTime = "";
    }

    var updateMealData = function ( mealData, cb ) {

        var mealDataAddUrl = fsConfigs.domain + ':' + fsConfigs.port + fsConfigs.orgAddApiUriPath;
        var req = {
            method: 'POST',
            url: mealDataAddUrl,
            headers: {
            },
            data: mealData
        }

        $http(req).then(function( response ){
            if( response !== undefined ) {
                if ( cb !== undefined && typeof cb === 'function' )
                    cb(response);
            }
        } );

    }

    return {
        getAddMealViewData: getAddMealViewData
    }

}]);