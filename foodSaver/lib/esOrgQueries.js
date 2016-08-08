var FsConfig = require('./config.js');
var constants = FsConfig.constants;

exports.getOrgDataQuery = function ( idx, itype, obj ) {
    var searchParams = {
        index: idx,
        type: itype,

        body: {
            "query": {
                "bool": {
                    "must": [
                        {"term": {"_id": obj.id }}
                    ]
                }
            }
        }
    };
    return searchParams;
}

exports.updateOrgQuery = function ( idx, itype, obj ) {

    var searchParams = {
        index: idx,
        type: itype,
        id: obj.id,
        body: {
            "name" : obj.name,
            "address": {
                "street" : obj.address.street,
                "city" : obj.address.city,
                "state": obj.address.state,
                "zip": obj.address.zip
            },
            "loc-coord": obj.locCoord,
            "contact" : {
                "contact-persons": obj.contact.contactPersons,
                "phones": obj.contact.phones,
                "email-ids": obj.contact.emailIds,
                "fax": obj.contact.fax,
                "whatsapp-id": obj.contact.whatsappId
            },
            "contact-mode" : obj.contactMode,
            "type-info" : {
                "org-type" : obj.orgType,
                "org-for" : obj.orgFor,
                "org-for-name" : obj.orgForName
            },
            "est-meal-amount" : obj.estMealAmnt,
            "comment" : obj.comment,
            "rating" : 3
        }
    };
    return searchParams;
}

exports.addOrgQuery = function ( idx, itype, obj ) {

    var searchParams = {
        index: idx,
        type: itype,
        body: {
            "name" : obj.name,
            "address": {
                "street" : obj.address.street,
                "city" : obj.address.city,
                "state": obj.address.state,
                "zip": obj.address.zip
            },
            "loc-coord": obj.locCoord,
            "contact" : {
                "contact-persons": obj.contact.contactPersons,
                "phones": obj.contact.phones,
                "email-ids": obj.contact.emailIds,
                "fax": obj.contact.fax,
                "whatsapp-id": obj.contact.whatsappId
            },
            "contact-mode" : obj.contactMode,
            "type-info" : {
                "org-type" : obj.orgType,
                "org-for" : obj.orgFor,
                "org-for-name" : obj.orgForName
            },
            "est-meal-amount" : obj.estMealAmnt,
            "comment" : obj.comment,
            "rating" : 3
        }
    };
    return searchParams;
}

exports.searchOrgQuery = function ( idx, itype, obj ) {

    //todo is this checking of empty object ok
    if( obj.orgName !== undefined ){
        var orgNameQry = {"term": {"name": obj.orgName }};
    }else{
        var orgNameQry = {};
    }
    
    if( obj.radius !== undefined && obj.locCoord !== undefined ){
        var distQry = {
            "geo_distance": {
                "distance": obj.radius,
                    "loc-coord": obj.locCoord
            }
        };
    } else {
        var distQry = {};
    }

    if( obj.orgType !== undefined ){
        var orgTypeQry = {"term": {"type-info.org-type": obj.orgType }};
    }else{
        var orgTypeQry = {};
    }

    if( obj.orgFor !== undefined ){
        var orgForQry = {"term": {"type-info.org-for": obj.orgFor }};
    }else{
        var orgForQry = {};
    }

    if( obj.orgForName !== undefined ){
        var orgForNameQry = {"term": {"type-info.org-for-name": obj.orgForName }};
    }else{
        var orgForNameQry = {};
    }

    if( obj.contactMode !== undefined ){
        var contModeQry = {"term": {"contact-mode": obj.contactMode }};
    }else{
        var contModeQry = {};
    }

    if( obj.rating !== undefined && obj.rating !== -1 ){
        var ratingQry = {"range": {"rating": { "gte" : obj.rating } } };
    }else{
        var ratingQry = {};
    }
    

    var searchParams = {
        index: idx,
        type: itype,

        body: {
            "query": {
                "bool": {
                    "must": [
                        orgNameQry,
                        orgTypeQry,
                        orgForQry,
                        orgForNameQry,
                        contModeQry,
                        ratingQry
                    ],
                    "filter" : distQry
                }
            }
        }
    };
    return searchParams;
}
