var FsConfig = require('./config.js');
var constants = FsConfig.constants;

exports.returnUndefIfInvalidStr = function ( str ) {
    var res = ( str !== undefined && str.length > 0 ) ? str : undefined;
    return res;
}

exports.returnMinusOneIfNotInt = function ( num ) {
    var res = ( num !== undefined && num.length > 0 ) ? parseInt(num) : -1;
    return res;
}

exports.returnMinusOneIfNotFloat = function ( num ) {
    var res = ( num !== undefined && num.length > 0 ) ? parseFloat(num) : -1;
    return res;
}

exports.getOrgEsId = function ( id ) {
    var res = ( id !== undefined && id.length > 0 ) ? id : undefined;
    return res;
}

exports.getOrgName = function ( orgName ) {
    var res = ( orgName !== undefined && orgName.length > 0 ) ? orgName : undefined;
    return res;
}

exports.getStreet = function ( street ) {
    var res = ( street !== undefined && street.length > 0 ) ? street : undefined;
    return res;
}

exports.getCity = function ( city ) {
    var res = ( city !== undefined && city.length > 0 ) ? city : undefined;
    return res;
}

exports.getState = function ( state ) {
    var res = ( state !== undefined && state.length > 0 ) ? state : undefined;
    return res;
}

exports.getZip = function ( zip ) {
    var res = ( zip !== undefined && zip.length > 0 ) ? parseInt(zip) : -1;
    return res;
}

exports.getPersons = function ( persons ) {
    var res = ( persons !== undefined && persons.length > 0 ) ? persons : "";
    return res;
}

exports.getPhones = function ( phones ) {
    var res = ( phones !== undefined && phones.length > 0 ) ? phones : "";
    return res;
}

exports.getEmailIds = function ( emails ) {
    var res = ( emails !== undefined && emails.length > 0 ) ? emails : "";
    return res;
}

exports.getFaxes = function ( faxes ) {
    var res = ( faxes !== undefined && faxes.length > 0 ) ? faxes : "";
    return res;
}

exports.getBreakFastAmnt = function ( estBreakfastAmnt ) {
    var res = ( estBreakfastAmnt !== undefined && estBreakfastAmnt.length > 0 ) ? parseFloat(estBreakfastAmnt) : -1;
    return res;
}

exports.getLunchAmnt = function ( estLunchAmnt ) {
    var res = ( estLunchAmnt !== undefined && estLunchAmnt.length > 0 ) ? parseFloat(estLunchAmnt) : -1;
    return res;
}

exports.getDinnerAmnt = function ( estDinnerAmnt ) {
    var res = ( estDinnerAmnt !== undefined && estDinnerAmnt.length > 0 ) ? parseFloat(estDinnerAmnt) : -1;
    return res;
}

exports.getComment = function ( comment ) {
    var res = ( comment !== undefined && comment.length > 0 ) ? comment : "";
    return res;
}

exports.getWhatsAppIds = function ( wIds ) {
    var res = ( wIds !== undefined && wIds.length > 0 ) ? wIds : "";
    return res;
}

exports.getLon = function( lon ){
    return ( lon !== undefined ) ? parseFloat( lon ) : constants.LON;
}

exports.getLat = function ( lat ) {
    return ( lat !== undefined ) ? parseFloat( lat ) : constants.LAT;
}

exports.getRadius = function ( radius ) {
    return ( radius !== undefined && radius.length > 0 ) ? radius+'km' : undefined;
}

exports.getOrgType = function ( orgType ) {
    return ( orgType !== undefined && orgType.length > 0 ) ? orgType : undefined;
}

exports.getOrgFor = function ( orgFor ) {
    return ( orgFor !== undefined && orgFor.length > 0 ) ? orgFor : undefined;
}

exports.getOrgForName = function ( orgForName ) {
    return ( orgForName !== undefined && orgForName.length > 0 ) ? orgForName : undefined;
}

exports.getContactMode = function ( contactMode ) {
    return ( contactMode !== undefined && contactMode.length > 0 ) ? contactMode : undefined;
}

exports.getBreakFastMin = function ( bmin ) {
    return bmin ? bmin : -1;
}

exports.getBreakFastMax = function ( bmax ) {
    return bmax ? bmax : -1;
}

exports.getLunchMin = function ( lmin ) {
    return lmin ? lmin : -1;
}

exports.getLunchMax = function ( lmax ) {
    return lmax ? lmax : -1;
}

exports.getDinnerMin = function ( dmin ) {
    return dmin ? dmin : -1;
}

exports.getDinnerMax = function ( dmax ) {
    return dmax ? dmax : -1;
}

exports.getRating = function (rating ) {
    return ( rating !== undefined && rating.length > 0 ) ? parseFloat( rating ) : -1;
}

exports.validateAddOrgData = function ( org ) {
    var ret = {};
    ret.error = true;
    ret.msg = [];

    if( org.name === undefined ){
        ret.msg.push( "org name not provided" );
        //return ret;
    }

    if( org.address.street === undefined || org.address.city === undefined || org.address.state === undefined ){
        ret.msg.push( "address not provided" );
    }

/*
    if( !org.locCoord instanceof Array ){
        ret.msg.push( "loccoord not provided as array" );
    }else{
        if( org.locCoord.length != 2 ){
            ret.msg.push( "invalid loccoord provided" );
        }
    }
*/

    if( !org.contact instanceof Object ){
        ret.msg.push( "contact not object" );
    }else{
        if( org.contact.phones.length < 1 ){
            ret.msg.push( "contact phone not provided" );
        }
    }

/*
    if( org.contactMode === undefined ){
        ret.msg.push( "contact mode not provided" );
    }
*/

    if( !org.typeInfo instanceof Object ){
        ret.msg.push( "typeinfo not object" );
    }else{
        if( org.typeInfo.orgType === undefined ){
            ret.msg.push( "orgType not provided" );
        }
/*        if( org.typeInfo.orgFor === undefined ){
            ret.msg.push( "orgFor not provided" );
        }
        if( org.orgType.orgForName === undefined ){
            ret.msg.push( "orgForName not provided" );
        }*/
    }

    if( !org.estMealAmnt instanceof Object ){
        ret.msg.push( "estMealAmnt not object" );
    }else{
        if( org.estMealAmnt.breakfastAmnt == -1 ){
        //    ret.msg.push( "breakfastAmnt not set" );
            org.estMealAmnt.breakfastAmnt = 1;
        }
        if( org.estMealAmnt.lunchAmnt == -1 ){
            //ret.msg.push( "lunchAmnt not set" );
            org.estMealAmnt.lunchAmnt = 1;
        }
        if( org.estMealAmnt.dinnerAmnt == -1 ){
            //ret.msg.push( "dinnerAmnt not set" );
            org.estMealAmnt.dinnerAmnt = 1;
        }
    }

    if( ret.msg.length > 0 ){
        return ret;
    }

    ret.error = false;
    return ret;

}