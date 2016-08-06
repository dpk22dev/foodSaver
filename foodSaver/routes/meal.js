var express = require('express');
var router = express.Router();
var config = require('../lib/config.js');
var mealUtils = require('../lib/mealUtils.js');
var orgUtils = require('../lib/orgUtils.js');
var esQueryProvider = require('../lib/esMealQueries.js');

var esClient = require('../lib/esClient.js');
var mealIndex = config.es.mealIndex;
var mealType = config.es.mealIndexType;
/*
//meal post body
 orgId
 contMode
 foodType
 quantity
 mealFor
 forName
 foodInfo
 street
 city
 state
 zip
 lon
 lat
 startPickTime
 endPickTime
 comment
 refrig
 estExpTime

 */

var getMealObj = function ( obj ) {

    var meal = {};
    meal.orgId = orgUtils.returnUndefIfInvalidStr( obj.orgId );
    //meal.orgType = orgUtils.getOrgType( obj.orgType );
    meal.contMode = orgUtils.getContactMode( obj.contMode );
    meal.foodType = orgUtils.returnUndefIfInvalidStr( obj.foodType );
    meal.quantity = orgUtils.returnMinusOneIfNotInt( obj.quantity );
    meal.mealFor  = orgUtils.returnUndefIfInvalidStr( obj.mealFor );
    meal.forName = orgUtils.returnUndefIfInvalidStr( obj.mealForName );
    meal.foodInfo = orgUtils.returnUndefIfInvalidStr( obj.foodInfo );
    meal.pickUpAddr = {};
    meal.pickUpAddr.street = orgUtils.returnUndefIfInvalidStr( obj.street );
    meal.pickUpAddr.city = orgUtils.returnUndefIfInvalidStr( obj.city );
    meal.pickUpAddr.state  = orgUtils.returnUndefIfInvalidStr( obj.state );
    meal.pickUpAddr.zip = orgUtils.getZip( obj.zip );
    var lon = orgUtils.returnMinusOneIfNotFloat( obj.lon );
    var lat = orgUtils.returnMinusOneIfNotFloat( obj.lat );
    meal.pickUpCoord = [lon, lat];
    meal.pickUpTimings = {};
    meal.pickUpTimings.start = orgUtils.returnUndefIfInvalidStr( obj.startPickTime );
    meal.pickUpTimings.end = orgUtils.returnUndefIfInvalidStr( obj.endPickTime );
    meal.comment = orgUtils.returnUndefIfInvalidStr( obj.comment );
    meal.refrig = orgUtils.returnUndefIfInvalidStr( obj.refrig );
    meal.estExpTime = orgUtils.returnUndefIfInvalidStr( obj.estExpTime );
    meal.status = "unassigned";
    meal.recipient = "";

    return meal;
}

var getMealObjForSearch = function ( obj ) {

    var res = {};

    var lon = orgUtils.returnMinusOneIfNotFloat( obj.lon );
    var lat = orgUtils.returnMinusOneIfNotFloat( obj.lat );

    //res.id = orgUtils.returnUndefIfInvalidStr( obj.orgId );
    //res.orgType = orgUtils.getOrgType( obj.orgType );

    res.foodType = orgUtils.returnUndefIfInvalidStr( obj.foodType );
    res.forStr = orgUtils.returnUndefIfInvalidStr( obj.orgFor );
    res.refrig = orgUtils.returnUndefIfInvalidStr( obj.refrig );
    res.radius = orgUtils.returnMinusOneIfNotFloat( obj.radius );
    res.coordArr = [ lon, lat ];

    return res;
}

var getActiveMealsQueryObj = function ( obj ) {

    var res = {};
    res.id = orgUtils.returnUndefIfInvalidStr( obj.orgId );
    res.orgType = orgUtils.getOrgType( obj.orgType );

    return res;
}

var getMealHistoryQueryObj = function ( obj ) {
    var res = {};
    res.id = orgUtils.returnUndefIfInvalidStr( obj.orgId );
    res.orgType = orgUtils.getOrgType( obj.orgType );

    return res;
}

/* GET users listing. */

router.post('/active-meals', function(req, res, next) {

    var obj = getActiveMealsQueryObj( req.body );
    if( obj.id === undefined || obj.orgType === undefined ){
        res.send( "id or orgtype is not valid" );
    }

    var query = esQueryProvider.getActiveMealsQuery(mealIndex, mealType, obj ) ;

    esClient.search( query ).then(function (resp) {
        var respArr = resp.hits.hits;
        res.send( respArr );
    }, function (err) {
        console.trace(err.message);
        res.send( err.message );
    });

});

/*
 query params orgId, orgType
 */
router.get('/history', function(req, res, next) {

    var obj = getMealHistoryQueryObj( req.query );
    if( obj.id === undefined || obj.orgType === undefined ){
        res.send( "id or orgtype is not valid" );
    }
    var query = esQueryProvider.getMealHistoryQuery(mealIndex, mealType, obj) ;

    esClient.search( query ).then(function (resp) {
        var respArr = resp.hits.hits;
        res.send( respArr );
    }, function (err) {
        console.trace(err.message);
        res.send( err.message );
    });

});


router.post('/add-meal', function(req, res, next) {

    var mealObj = getMealObj( req.body );
    var isValid = mealUtils.validateAddMealData( mealObj );
    if( isValid.error === true ){
        res.send( isValid.msg );
    }
    var query = esQueryProvider.addMealQuery(mealIndex, mealType, mealObj) ;

    esClient.create( query ).then(function (resp) {
        var respArr = resp.hits.hits;
        res.send( respArr );
    }, function (err) {
        console.trace(err.message);
        res.send( err.message );
    });

});

router.delete('/', function(req, res, next) {
    
    var id = mealUtils.getMealEsId( req.query.id );

    var query = esQueryProvider.deleteMealQuery(mealIndex, mealType, id) ;

    esClient.delete( query ).then(function (resp) {
        var respArr = resp.hits.hits;
        res.send( respArr );
    }, function (err) {
        console.trace(err.message);
        res.send( err.message );
    });

});

router.post('/search', function(req, res, next) {

    var mealObj = getMealObjForSearch( req.body );
    var isValid = mealUtils.validateMealObjForSrch( mealObj );
    if( isValid.error === true ){
        res.send( isValid.msg );
    }

    var query = esQueryProvider.getMealSearchQuery(mealIndex, mealType, mealObj) ;

    esClient.search( query ).then(function (resp) {
        var respArr = resp.hits.hits;
        res.send( respArr );
    }, function (err) {
        console.trace(err.message);
        res.send( err.message );
    });

});

module.exports = router;