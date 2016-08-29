angular.module('app').factory('orgCrudService', ['$http', 'FsConfigService', 'FsLoggerService', 'utilsService', function( $http, fsConfigs, fsLogger, utilsService ){

    var getViewData = function ( orgData ) {

        //@todo if returned object member is undefined use initized value
        
        var res = {};
        res.orgName = orgData.name;
        res.street = orgData.address.street;
        res.city = orgData.address.city;
        res.state = orgData.address.state;
        res.zip = orgData.address.zip.toString();
        res.lon = orgData['loc-coord'][0].toString();
        res.lat = orgData['loc-coord'][1].toString();
        res.persons = getContactPersons( orgData );
        res.phones = getContactPhones( orgData );
        res.emailIds = getEmailIds( orgData );
        res.faxes = getFaxes( orgData );
        res.whatsappIds = getWhatsAppIds( orgData );
        res.contMode = fsConfigs.contactModesArr[0].value;
        res.orgType = fsConfigs.orgTypeArr[0].value;
        res.orgFor = fsConfigs.orgForArr[0].value;
        res.orgForName = getOrgForName( orgData );
        res.estBreakfastAmnt = orgData['est-meal-amount']['breakfast'].toString();
        res.estLunchAmnt = orgData['est-meal-amount']['lunch'].toString();
        res.estDinnerAmnt = orgData['est-meal-amount']['dinner'].toString();
        res.comment = orgData.comment;
        res.rating = orgData.rating.toString();

        return res;
    }

    var initViewData = function ( res ) {

        res.orgName = "";
        res.street = "";
        res.city = "";
        res.state = "";
        res.zip = "";
        res.lon = "";
        res.lat = "";
        res.persons = "";
        res.phones = "";
        res.emailIds = "";
        res.faxes = "";
        res.whatsappIds = "";
        res.contMode = "";
        res.orgType = "";
        res.orgFor = "";
        res.orgForName = "";
        res.estBreakfastAmnt = "";
        res.estLunchAmnt = "";
        res.estDinnerAmnt = "";
        res.comment = "";
        res.rating = "";

        return res;
    }
    
    var getViewDataInitWhenEmpty = function ( orgData ) {

        //@todo if returned object member is undefined use initized value
        var res = initViewData( {} );

        if( utilsService.isObjectEmpty( orgData ) ){
            return res;
        }
        
        if( !utilsService.isStringEmpty( orgData.name ) ){
            res.orgName = orgData.name;
        }

        if( !utilsService.isObjectEmpty( orgData.address ) ) {
            if( !utilsService.isStringEmpty( orgData.address.street ) ) {
                res.street = orgData.address.street;
            }

            if( !utilsService.isStringEmpty( orgData.address.city ) ){
                res.city = orgData.address.city;
            }

            if( !utilsService.isStringEmpty( orgData.address.state ) ){
                res.state = orgData.address.state;
            }

            if( utilsService.isNumber( orgData.address.zip ) ){
                res.zip = orgData.address.zip.toString();
            }
        }

        if( !utilsService.isArrayEmpty( orgData['loc-coord'] ) ){
            res.lon = orgData['loc-coord'][0].toString();
            res.lat = orgData['loc-coord'][1].toString();
        }

        if( !utilsService.isObjectEmpty( orgData.contact ) ){
            res.persons = getContactPersons( orgData );
            res.phones = getContactPhones( orgData );
            res.emailIds = getEmailIds( orgData );
            res.faxes = getFaxes( orgData );
            res.whatsappIds = getWhatsAppIds( orgData );
        }

        res.contMode = fsConfigs.contactModesArr[0].value;
        res.orgType = fsConfigs.orgTypeArr[0].value;
        res.orgFor = fsConfigs.orgForArr[0].value;

        if( !utilsService.isObjectEmpty( orgData['type-info']) ){
            res.orgForName = getOrgForName( orgData );
        }

        if( !utilsService.isObjectEmpty( orgData['est-meal-amount'] ) ){
            if( utilsService.isNumber( orgData['est-meal-amount']['breakfast'] ) ){
                res.estBreakfastAmnt = orgData['est-meal-amount']['breakfast'].toString();
            }
            if( utilsService.isNumber( orgData['est-meal-amount']['lunch'] ) ){
                res.estLunchAmnt = orgData['est-meal-amount']['lunch'].toString();
            }
            if( utilsService.isNumber( orgData['est-meal-amount']['dinner'] ) ){
                res.estDinnerAmnt = orgData['est-meal-amount']['dinner'].toString();
            }
        }


        res.comment = orgData.comment;
        if( utilsService.isNumber( orgData.rating ) ){
            res.rating = orgData.rating.toString();
        }


        return res;
    }

/*
    var orgObjectForPostData = function ( ) {
        var res = {};
        res.orgName = orgData.name;
        res.street = orgData.address.street;
        res.city = orgData.address.city;
        res.state = orgData.address.state
        res.zip = orgData.address.zip
        res.lon = orgData['loc-coord'][0];
        res.lat = orgData['loc-coord'][1];
        res.persons = orgData.contact['contact-persons'].join(',');
        res.phones = orgData.contact['phones'].join(',');
        res.emailIds = orgData.contact['email-ids'].join(',');
        res.faxes = orgData.contact['fax'].join(',');
        res.whatsappIds = orgData.contact['whatsapp-id'].join(',');
        res.contMode = orgData.selectedModeObj.value;
        res.orgType = orgData.selectedOrgTypeObj.value;
        res.orgFor = orgData.selectedOrgForObj;
        res.orgForName = orgData['type-info']['org-for-name'];
        res.estBreakfastAmnt = orgData['est-meal-amount']['breakfast'];
        res.estLunchAmnt = orgData['est-meal-amount']['lunch'];
        res.estDinnerAmnt = orgData['est-meal-amount']['dinner'];
        res.comment = orgData.comment;

        return res;
    }
*/
    var getOrgData = function( orgId, cb ){

        var orgDataFetchUrl = fsConfigs.domain + ':' + fsConfigs.port + fsConfigs.orgGetApiUriPath + '?orgId='+orgId;
        $http.get( orgDataFetchUrl, { withCredentials: true } ).then(function( response ){
            if( response !== undefined ) {
                if ( cb !== undefined && typeof cb === 'function' )
                    cb(response);
            }
        } );

    }
    
    var updateOrgData = function ( orgData, cb ) {

        var orgDataAddUrl = fsConfigs.domain + ':' + fsConfigs.port + fsConfigs.orgAddApiUriPath;
        var req = {
            method: 'POST',
            url: orgDataAddUrl,
            headers: {
            },
            data: orgData
        }

        $http(req).then(function( response ){
            if( response !== undefined ) {
                if ( cb !== undefined && typeof cb === 'function' )
                   cb(response);
            }
        } );

    }

    var searchNearbyOrgs = function ( searchData, cb ) {

        var orgDataAddUrl = fsConfigs.domain + ':' + fsConfigs.port + fsConfigs.orgSearchApiUriPath;
        var req = {
            method: 'POST',
            url: orgDataAddUrl,
            headers: {
            },
            data: searchData
        }

        $http(req).then(function( response ){
            if( response !== undefined ) {
                if ( cb !== undefined && typeof cb === 'function' )
                    cb(response);
            }
        } );

    }

    var getContactPersons = function ( orgData ) {
        if( orgData.contact['contact-persons'] instanceof Array )
            return orgData.contact['contact-persons'].join(',');
        else
            return orgData.contact['contact-persons'];
    }

    var getContactPhones =  function ( orgData ) {
        if( orgData.contact['phones'] instanceof Array )
            return orgData.contact['phones'].join(',');
        else
            return orgData.contact['phones'];
    }

    var getEmailIds = function ( orgData ) {
        if( orgData.contact['email-ids'] instanceof Array )
            return orgData.contact['email-ids'].join(',');
        else
            return orgData.contact['email-ids'];
    }
    var getFaxes = function ( orgData ) {
        if( orgData.contact['fax'] instanceof Array )
            return orgData.contact['fax'].join(',');
        else
            return orgData.contact['fax'];
    }

    var  getWhatsAppIds = function ( orgData ) {
        if( orgData.contact['whatsapp-id'] instanceof Array )
            return orgData.contact['whatsapp-id'].join(',');
        else
            return orgData.contact['whatsapp-id'];
    }
    var getOrgForName = function ( orgData ) {
        if( orgData['type-info']['org-for-name'] instanceof Array )
            return orgData['type-info']['org-for-name'].join(',');
        else
            return orgData['type-info']['org-for-name'];
    }
    
    
    return {
        getOrgData : getOrgData,
        updateOrgData: updateOrgData,
        searchNearbyOrgs: searchNearbyOrgs,
        getViewData: getViewData,
        getViewDataInitWhenEmpty: getViewDataInitWhenEmpty,
        initViewData: initViewData
    }

}]);