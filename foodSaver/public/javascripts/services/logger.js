/*
send file, line#, error
time taken by api
 */

angular.module('foodsaver').factory('FsLoggerService', ['$http', 'FsConfigService', '$log', function( $http, FsConfigs, $log ){

    var setMsg = function ( logData, msg ) {
        logData.msg = msg;
    }

    var consoleLog = function ( logData ) {
        $log.log( logData.msg );
    }

    var consoleWarn = function ( logData ) {
        $log.warn( logData.msg );
    }

    var consoleInfo = function ( logData ) {
        $log.info( logData.msg );
    }

    var consoleError = function ( logData ) {
        $log.error( logData.msg );
    }

    var consoleDebug = function ( logData ) {
        $log.debug( logData.msg );
    }
    
    var sendLog = function( logData, cb ){

        //if we want logging for logged in users only
        //if( auth.getLoginStatus() ){

        if( typeof  logData  === 'undefined' || logData === null ) {
            cb(new Error('empty data for logging'));
            return;
        }

        var req = {
            method: 'POST',
            url: tilConfigs.serverLogUrl,
            headers: {
            },
            data: logData
        }

        $http(req)
            .then(function(){
                consoleInfo('sent logging info successfully')
                if( cb && typeof cb === 'function' )
                    cb( null );
            },
            function( err ){
                consoleError('logging to server failed')
                if( cb && typeof cb === 'function' )
                    cb( err );
            });
        //}


    }

    return {
        sendLog : sendLog,
        //setUA: setUA,
        //setEditorId: setEditorId,
        setMsg: setMsg,
        consoleLog: consoleLog,
        consoleWarn: consoleWarn,
        consoleInfo: consoleInfo,
        consoleError: consoleError,
        consoleDebug: consoleDebug,
    }

}]);