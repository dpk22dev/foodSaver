var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    // extract params from post req
    var foodType = 'veg';
    var forStr = 'human';
    var refrig = false;
    var radius = '200km';
    var coordArr = [76.242969,29.6108605];
    // elastic queries
    var config = require('../lib/config.js');
    var elasticSearch = require('elasticsearch');

    var extend = require('util')._extend;
    var esConn = extend({}, config.es.connection);

    var esQueryProvider = require('../lib/esMealQueries.js');

    var esClient = new elasticSearch.Client( esConn );
    var mealIndex = config.es.mealIndex;
    var mealType = config.es.mealIndexType;

    var query = esQueryProvider.getMealSearchQuery(mealIndex, mealType, foodType, forStr, refrig, radius, coordArr);

    esClient.search( query ).then(function (resp) {
        var respArr = resp.hits.hits;
        res.send( respArr );
    }, function (err) {
        console.trace(err.message);
        res.send( err.message );
    });

});

module.exports = router;