angular.module('app').controller('updateOrgController', [ '$scope', '$http', 'FsConfigService', 'FsLoggerService', 'orgCrudService', function ( $scope, $http, fsConfigs, fsLogger, orgCrudService ) {

    //adding fields dynamically
    //http://stackoverflow.com/questions/28622309/dynamically-adding-creating-object-to-array-from-angular-view-to-controller-usin

    //@todo store post params in resData; maybe compare and insert default values
    //push this data service to server
    //$scope.orgCrudService = orgCrudService;
    //$scope.resData = {};

    $scope.viewData = {};
    $scope.orgData = {};
    $scope.id = "3";
    $scope.modesArr = fsConfigs.contactModesArr;
    $scope.orgData.selectedModeObj = fsConfigs.contactModesArr[0];

    $scope.orgTypeArr = fsConfigs.orgTypeArr;
    $scope.orgData.selectedOrgTypeObj =  fsConfigs.orgTypeArr[0];

    $scope.orgForArr = fsConfigs.orgForArr;
    $scope.orgData.selectedOrgForObj = fsConfigs.orgForArr[0];

    $scope.init = function ( ) {
        //@todo get id from cookie or whatever
        orgCrudService.getOrgData( $scope.id, function ( resp ) {
            if (resp.status === 200){
                $scope.orgData = resp.data;
                $scope.viewData = orgCrudService.getViewData( $scope.orgData );
            }else {
                // maybe put some initialised dummy data
                $scope.viewData = {};
            }
        });
    }

    $scope.saveOrgData = function ( ) {
        //console.log( $scope.viewData );
        //var orgObj = orgCrudService.orgObjectForPostData( $scope.viewData );

         orgCrudService.updateOrgData( $scope.viewData, function ( response ) {

         if (response.status === 200){
            //call again to refill updated data
            $scope.init();
         }else{
         //show message reason for failure
         }
         });

    }

    $scope.init();

/*
    $scope.getOrgName = function (  ) {
        return $scope.orgData.name;
    }
    $scope.getAddress = function ( ) {
        return $scope.orgData.address;
    }
    $scope.getStreet = function ( ) {
        return $scope.orgData.address.street;
    }
    $scope.getCity = function ( ) {
        return $scope.orgData.address.city;
    }
    $scope.getState = function ( ) {
        return $scope.orgData.address.state;
    }
    $scope.getZip = function ( ) {
        return $scope.orgData.address.zip;
    }
    $scope.getLocCoord = function ( ) {
        return $scope.orgData['loc-coord'];
    }
    $scope.getLat = function ( ) {
        return $scope.orgData['loc-coord'][1];
    }
    $scope.getLon = function ( ) {
        return $scope.orgData['loc-coord'][0];
    }
    $scope.getContact = function ( ) {
        return $scope.orgData.contact;
    }
    $scope.getContactPersons = function ( ) {
        if( $scope.orgData.contact['contact-persons'] instanceof Array )
            return $scope.orgData.contact['contact-persons'].join(',');
        else
            return $scope.orgData.contact['contact-persons'];
    }

    $scope.getContactPhones =  function ( ) {
        if( $scope.orgData.contact['phones'] instanceof Array )
            return $scope.orgData.contact['phones'].join(',');
        else
            return $scope.orgData.contact['phones'];
    }

    $scope.getEmailIds = function ( ) {
        if( $scope.orgData.contact['email-ids'] instanceof Array )
            return $scope.orgData.contact['email-ids'].join(',');
        else
            return $scope.orgData.contact['email-ids'];
    }
    $scope.getFaxes = function ( ) {
        if( $scope.orgData.contact['fax'] instanceof Array )
            return $scope.orgData.contact['fax'].join(',');
        else
            return $scope.orgData.contact['fax'];
    }

    $scope.getWhatsAppIds = function ( ) {
        if( $scope.orgData.contact['whatsapp-id'] instanceof Array )
            return $scope.orgData.contact['whatsapp-id'].join(',');
        else
            return $scope.orgData.contact['whatsapp-id'];
    }
    $scope.getContactMode = function ( ) {
        return $scope.orgData.contact['contact-mode'];
    }
    $scope.getTypeInfo = function ( ) {
        return $scope.orgData['type-info'];
    }
    $scope.getOrgType = function ( ) {
        return $scope.orgData['type-info']['org-type'];
    }
    $scope.getOrgFor = function ( ) {
        return $scope.orgData['type-info']['org-for'];
    }
    $scope.getOrgForName = function ( ) {
        if( $scope.orgData['type-info']['org-for-name'] instanceof Array )
            return $scope.orgData['type-info']['org-for-name'].join(',');
        else
            $scope.orgData['type-info']['org-for-name'];
    }
    $scope.getEstMealAmount = function ( ) {
        return $scope.orgData['est-meal-amount'];
    }
    $scope.getEstMealAmountForBreakfast = function ( ) {
        return $scope.orgData['est-meal-amount']['breakfast'];
    }
    $scope.getEstMealAmountForLunch = function ( ) {
        return $scope.orgData['est-meal-amount']['lunch'];
    }
    $scope.getEstMealAmountForDinner = function ( ) {
        return $scope.orgData['est-meal-amount']['dinner'];
    }
    $scope.getComment = function ( ) {
        return $scope.orgData.comment;
    }
    $scope.getRating = function ( ) {
        return $scope.orgData.rating;
    }

    $scope.setStreet =function (){
        console.log('setting street');
    }
    */

} ] );