angular.module('foodsaver').controller('searchController', [ '$scope', '$http', 'FsConfigService', 'FsLoggerService', function ($scope, $http, FsConfigService, FsLoggerService ) {

    $scope.statisticsData = [];
    $scope.approverData = [];
    $scope.approverChannelList = [];
    $scope.selectedApproverChannel = "All";

    var fetchCommentCounts = function(){
        var domain = tilConfigs.CommentCountDomain + "/?days=1" +"&"+ tilConfigs.callBackForAng;

        $http.jsonp( domain ).then(function( response ){

            if( 200 == response.status ) {
                $scope.statisticsData = response.data;
            } else {

                var logData = tilLogger.getFilledObj( domain, response.status, response.statusText, tilLogger.getReqTimeInMs( response )  )
                tilLogger.sendLog(  logData );
                tilLogger.consoleError( logData );
            }

        }, function( error ){
            var logData = tilLogger.getFilledObj( domain, error.status,  "fetchCommentsCounts api failed: " + error.statusText, tilLogger.getReqTimeInMs( error ) );
            tilLogger.sendLog(  logData );
            tilLogger.consoleError( logData );
        } )
    }

    var getSelectedApproverChannel = function( hostid ){

        return "appkey=" + hostid + "&";

    }

    $scope.fetchTop5Approver = function(){
        var domain = tilConfigs.top5ApproverDomain + "?"+ getSelectedApproverChannel( $scope.selectedApproverChannel ) + tilConfigs.callBackForAng;

        $http.jsonp( domain ).then(function( response ){
            if( 200 == response.status ) {
                //$scope.approverData = response.data;
                $scope.approverData = [{
                    "A_K": "TOI long long string",
                    "ED_ID": "dpk2dev log log id",
                    "APP_C": "300000"
                }];
            } else {
                var logData = tilLogger.getFilledObj( domain, response.status, response.statusText, tilLogger.getReqTimeInMs( response )  )
                tilLogger.sendLog(  logData );
                tilLogger.consoleError( logData );
            }

        }, function( error ){
            var logData = tilLogger.getFilledObj( domain, error.status,  "fetch top 5 approver api failed: " + error.statusText, tilLogger.getReqTimeInMs( error ) );
            tilLogger.sendLog(  logData );
            tilLogger.consoleError( logData );
        } );
    }

    $scope.getChannelName = function ( index ) {
        return channelList.getChannelName( $scope.approverChannelList[index] ) + "";
    }

    $scope.getAppKey = function ( index ) {
        return channelList.getAppKey( $scope.approverChannelList[index] ) + "";
    }

    var init = function(){
        channelList.getChannelList( ).then( function ( channelArr ) {
            $scope.approverChannelList = channelArr;
            $scope.selectedApproverChannel = channelList.getAppKey( $scope.approverChannelList[tilConfigs.defaultChannelIndex] ) + "";
            $scope.fetchTop5Approver();
        }, function ( error ) {
            // log failed to get channel list
            var logData = tilLogger.getFilledObj( domain, error.status,  "get channel list failed: " + error.statusText, tilLogger.getReqTimeInMs( error ) );
            tilLogger.sendLog(  logData );
            tilLogger.consoleError( logData );
        });

        fetchCommentCounts();

    }

    init();

} ] );