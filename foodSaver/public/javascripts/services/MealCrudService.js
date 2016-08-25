angular.module('foodsaver').factory('mealCrudService', ['$http', 'FsConfigService', 'FsLoggerService', function( $http, fsConfigs, fsLogger ){

    var getAddMealViewData = function ( donId ) {
        //@todo below settings should be based on user org preferences if he is donor
        var res = {};
        res.donorId = donId;
        res.contactMode = fsConfigs.defaultContactMode.value;
        res.foodType = fsConfigs.defaultFoodType.value;
        res.quantity = fsConfigs.defaultDonationQuantity.value;
        res.for = fsConfigs.defaultOrgFor.value;
        res.forName = fsConfigs.defaultForName;
        res.foodInfo = "";
        res.pStreet= "";
        res.pCity = "";
        res.pState = "";
        res.pZip = "";
        res.pLat = "";
        res.pLon = "";
        res.psTime = "";
        res.peTime = "";
        res.comment = "";
        res.refg = "";
        res.estExpTime = "";
    }

    return {
        getAddMealViewData: getAddMealViewData
    }

}]);