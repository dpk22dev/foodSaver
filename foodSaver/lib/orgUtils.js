//var FsConfig = require('./config.js');

exports.getOrgName = function ( orgName ) {
    var res = ( orgName !== undefined && orgName.length > 0 ) ? orgName : undefined;
    return res;
}

exports.getLon = function( lon ){
    return ( lon !== undefined ) ? parseFloat( lon ) : 77;
}

exports.getLat = function ( lat ) {
    return ( lat !== undefined ) ? parseFloat( lat ) : 29;
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