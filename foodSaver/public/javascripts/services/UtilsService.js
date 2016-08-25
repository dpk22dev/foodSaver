angular.module('foodsaver').factory('utilsService', ['$http', 'FsConfigService', 'FsLoggerService', function( $http, fsConfigs, fsLogger ){

    var returnEmptyIfInvalidStr = function ( str ) {
        var res = ( typeof str !== 'undefined' && str.length > 0 ) ? str : "";
        return res;
    }

    //input num is string
    // cant use typeof as number
    var returnMinusOneIfNotInt = function ( num ) {
        var res = ( typeof num !== 'undefined' && num.length > 0 ) ? parseInt(num) : -1;
        return res;
    }

    var returnMinusOneIfNotFloat = function ( num ) {
        var res = ( typeof num !== 'undefined' && num.length > 0 ) ? parseFloat(num) : -1;
        return res;
    }

    var isArrayEmpty = function ( array ) {
        if(typeof array != "undefined" && array != null && array.length > 0){
            return false;
        }
        return true;
    }

    var isObjectEmpty = function ( obj ) {
        return ( typeof obj === 'undefined' ) || ( Object.keys(obj).length === 0 && obj.constructor === Object ) || isNull( obj )
    }

    var isStringEmpty = function ( obj ) {
        if( isString( obj ) && obj.length > 0 ) return false;
        else return true;
    }

    var isString = function ( obj ) {
        if( typeof obj === 'string' ) return true;
        else return false;
    }

    //input should be number not string
    var isNumber = function ( obj ) {
        if( typeof obj === 'number' ) return true;
        else return false;
    }

    var isObject = function ( obj ) {
        if( typeof obj === 'object' ) return true;
        else return false;
    }
    
    var isArray = function ( arr ) {
        if( typeof arr !== 'undefined' && arr instanceof  Array ) return true;
        else return false;
    }

    var isFunction = function ( fn ) {
        if( typeof fn === 'function' ) return true;
        else return false;
    }

    var isUndefined = function ( obj ) {
        if( typeof obj === 'undefined' ) return true;
        else return false;
    }

    var isNull = function ( obj ) {
        if( typeof obj === 'object' && obj === null ) return true;
        else return false;
    }

    return {
        returnEmptyIfInvalidStr : returnEmptyIfInvalidStr,
        returnMinusOneIfNotInt: returnMinusOneIfNotInt,
        returnMinusOneIfNotFloat: returnMinusOneIfNotFloat,
        isArrayEmpty: isArrayEmpty,
        isObjectEmpty: isObjectEmpty,
        isString: isString,
        isStringEmpty: isStringEmpty,
        isNumber: isNumber,
        isObject: isObject,
        isArray: isArray,
        isFunction:isFunction,
        isNull:isNull,
        isUndefined: isUndefined
    }

}]);