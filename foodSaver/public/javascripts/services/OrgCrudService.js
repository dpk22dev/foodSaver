angular.module('foodsaver').factory('orgCrudService', ['$http', 'FsConfigService', 'FsLoggerService', function( $http, fsConfigs, fsLogger ){

    var getViewData = function ( orgData ) {

        var res = {};
        res.orgName = orgData.name;
        res.street = orgData.address.street;
        res.city = orgData.address.city;
        res.state = orgData.address.state
        res.zip = orgData.address.zip
        res.lon = orgData['loc-coord'][0];
        res.lat = orgData['loc-coord'][1];
        res.persons = getContactPersons( orgData );
        res.phones = getContactPhones( orgData );
        res.emailIds = getEmailIds( orgData );
        res.faxes = getFaxes( orgData );
        res.whatsappIds = getWhatsAppIds( orgData );
        res.contMode = fsConfigs.contactModesArr[0].value;
        res.orgType = fsConfigs.orgTypeArr[0].value;
        res.orgFor = fsConfigs.orgForArr[0].value;
        res.orgForName = getOrgForName( orgData );
        res.estBreakfastAmnt = orgData['est-meal-amount']['breakfast'];
        res.estLunchAmnt = orgData['est-meal-amount']['lunch'];
        res.estDinnerAmnt = orgData['est-meal-amount']['dinner'];
        res.comment = orgData.comment;

        return res;
    }
    
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
            orgData['type-info']['org-for-name'];
    }
    
    
    return {
        getOrgData : getOrgData,
        updateOrgData: updateOrgData,
        searchNearbyOrgs: searchNearbyOrgs,
        orgObjectForPostData: orgObjectForPostData,
        getViewData: getViewData
    }

}]);