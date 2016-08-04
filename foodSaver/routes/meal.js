var express = require('express');
var router = express.Router();
var config = require('../lib/config.js');
var esQueryProvider = require('../lib/esMealQueries.js');

var esClient = require('../lib/esClient.js');
var mealIndex = config.es.mealIndex;
var mealType = config.es.mealIndexType;

var getMealObj = function ( obj ) {

    var meal = {};
    //var id = req.body.id ? req.body.id : "3";
    meal.orgType = obj.orgType ? obj.orgType : "donor";
    meal.contMode = obj.contMode ? obj.contMode : "all";
    meal.foodType = obj.foodType ? obj.foodType : "veg";
    meal.quantity = obj.quantity ? obj.quantity : 1;
    meal.mealFor      = obj.mealFor ? obj.mealFor : "human";
    meal.forName = obj.forName ? obj.forName : "children";
    meal.foodInfo = obj.foodInfo ? obj.foodInfo : "dummy";
    meal.pickUpAddr = {};
    meal.pickUpAddr.street = obj.street ? obj.street.trim() : "1A random street";
    meal.pickUpAddr.city = obj.city ? obj.city : "some";
    meal.pickUpAddr.state  = obj.state ? obj.state : "random";
    meal.pickUpAddr.zip = obj.zip ? obj.zip : "110001";
    var lon = obj.lon ? obj.lon : 77;
    var lat = obj.lat ? obj.lat : 29;
    meal.pickUpCoord = [lon, lat];
    meal.pickUpTimings = {};
    meal.pickUpTimings.start = obj.startPickTime ? obj.startPickTime.trim() : "1992-07-22 14:20:12";
    meal.pickUpTimings.end = obj.endPickTime ? obj.endPickTime.trim() : "2050-07-22 12:00:01";
    meal.comment = obj.comment ? obj.comment : "dummy";
    meal.refrig = obj.refrig ? obj.refrig : false;
    meal.estExpTime = obj.estExpTime ? obj.estExpTime.trim() : "2050-07-22 12:00:01";
    meal.status = "unassigned";
    meal.recipient = "";

    return meal;
}

var getMealObjForSearch = function ( obj ) {

    var res = {};

    var lon = obj.lon ? obj.lon : 76.242969;
    var lat = obj.lat ? obj.lat : 29.6108605;

    res.id = obj.id ? obj.id : "3";
    res.orgType = obj.orgType ? obj.orgType : "donor";

    res.foodType = obj.foodType ? obj.foodType : 'veg';
    res.forStr = obj.forStr ? obj.forStr : 'human';
    res.refrig = obj.refg ? obj.refg : false;
    res.radius = obj.rad ? obj.rad : '200km';
    res.coordArr = [ lon, lat ];

    return res;
}

var getActiveMealsQueryObj = function ( obj ) {

    var res = {};
    res.id = obj.id ? obj.id : "3";
    res.orgType = obj.orgType ? obj.orgType : "donor";

    return res;
}

var getMealHistoryQueryObj = function ( obj ) {
    var res = {};
    res.id = obj.id ? obj.id : "3";
    res.orgType = obj.orgType ? obj.orgType : "donor";

    return res;
}

/* GET users listing. */
router.post('/active-meals', function(req, res, next) {

    var obj = getActiveMealsQueryObj( req.body );
    var query = esQueryProvider.getActiveMealsQuery(mealIndex, mealType, obj ) ;

    esClient.search( query ).then(function (resp) {
        var respArr = resp.hits.hits;
        res.send( respArr );
    }, function (err) {
        console.trace(err.message);
        res.send( err.message );
    });

});

router.get('/history', function(req, res, next) {

    var obj = getMealHistoryQueryObj( req.query );
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
    
    var id = req.query.id ? req.query.id : "3";

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