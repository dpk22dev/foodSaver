var express = require('express');
var router = express.Router();

var config = require('../lib/config.js');
var esQueryProvider = require('../lib/esOrgQueries.js');

var esClient = require('../lib/esClient.js');
var orgIndex = config.es.orgIndex;
var orgType = config.es.orgIndexType;

var getOrgObj = function ( obj ) {
    var res = {};
    res.name = obj.name ? obj.name : "dummy";
    res.address = {};
    res.address.street = obj.street ? obj.street : "dummy street";
    res.address.city = obj.city ? obj.city : "noida";
    res.address.state = obj.state ? obj.state : "uttar pradesh";
    res.address.zip = obj.zip ? obj.zip : '124001';
    var lon = obj.lon ? obj.lon : 77;
    var lat = obj.lat ? obj.lat : 29;
    res.locCoord = [lon, lat];
    var contact = {};
    var persons = obj.persons;
    res.contact.contactPersons = persons.split(",");

    var phones = obj.phones;
    res.contact.phones = phones.split(",");

    var emailIds = obj.emailIds;
    res.contact.emailIds = emailIds.split(",");

    var fax = obj.fax;
    res.contact.fax = fax;

    var whatsappId = obj.whatsappId;
    res.contact.whatsappId = whatsappId;

    res.contactMode = obj.contactMode ? obj.contactMode : "all";

    var typeInfo = {};
    typeInfo.orgType = obj.orgType ? obj.orgType : "donor";
    typeInfo.orgFor = obj.orgFor ? obj.orgFor : "human";
    typeInfo.orgForName = obj.orgForName ? obj.orgForName : "children";
    res.typeInfo = typeInfo;

    var estMealAmnt = {};
    var breakfastAmnt = obj.breakfastAmnt ? obj.breakfastAmnt : 1;
    var lunchAmnt = obj.lunchAmnt ? obj.lunchAmnt : 1;
    var dinnerAmnt = obj.dinnerAmnt ? obj.dinnerAmnt : 1;
    res.estMealAmnt = estMealAmnt;

    res.comment = obj.comment ? obj.comment : "God bless you!";

    return obj;
}

var getOrgObjForSearch = function ( obj ) {
    var res = {};
    res.orgName = ( obj.orgName !== undefined && obj.orgName.length > 0 ) ? obj.orgName : undefined;

    var lon = ( obj.lon !== undefined ) ? parseFloat( obj.lon ) : 77;
    var lat = ( obj.lat !== undefined ) ? parseFloat( obj.lat ) : 29;
    res.locCoord = [lon, lat];

    res.radius = ( obj.radius !== undefined && obj.radius.length > 0 ) ? obj.radius+'km' : undefined;

    res.orgType = ( obj.orgType !== undefined && obj.orgType.length > 0 ) ? obj.orgType : undefined;
    res.orgFor = ( obj.orgFor !== undefined && obj.orgFor.length > 0 ) ? obj.orgFor : undefined;
    res.orgForName = ( obj.orgForName !== undefined && obj.orgForName.length > 0 ) ? obj.orgForName : undefined;

    res.contactMode = ( obj.contactMode !== undefined && obj.contactMode.length > 0 ) ? obj.contactMode : undefined;

    res.breakfast = {};
    res.breakfast.min = obj.bmin ? obj.bmin : -1;
    res.breakfast.max = obj.bmax ? obj.bmax : -1;

    res.lunch = {};
    res.lunch.min = obj.lmin ? obj.lmin : -1;
    res.lunch.max = obj.lmax ? obj.lmax : -1;

    res.dinner = {};
    res.dinner.min = obj.dmin ? obj.dmin : -1;
    res.dinner.max = obj.dmax ? obj.dmax : -1;

    res.rating = ( obj.rating !== undefined && obj.rating.length > 0 ) ? parseFloat( obj.rating ) : -1;

    return res;
}

/* GET users listing. */
router.get('/', function(req, res, next) {

    var obj = {};
    obj.id = req.query.id ? req.query.id : "3";

    var query = esQueryProvider.getOrgDataQuery(orgIndex, orgType, obj) ;

    esClient.search( query ).then(function (resp) {
        var respArr = resp.hits.hits;
        res.send( respArr );
    }, function (err) {
        console.trace(err.message);
        res.send( err.message );
    });

});

router.post('/add-org', function(req, res, next) {

    var orgObj = getOrgObj( req.body );
    var query = esQueryProvider.addOrgQuery(orgIndex, orgType, orgObj) ;

    esClient.create( query ).then(function (resp) {
        var respArr = resp.hits.hits;
        res.send( respArr );
    }, function (err) {
        console.trace(err.message);
        res.send( err.message );
    });

});

router.post('/search', function(req, res, next) {

    var orgObj = getOrgObjForSearch( req.body );
    var query = esQueryProvider.searchOrgQuery(orgIndex, orgType, orgObj) ;

    esClient.search( query ).then(function (resp) {
        var respArr = resp.hits.hits;
        res.send( respArr );
    }, function (err) {
        console.trace(err.message);
        res.send( err.message );
    });

});

module.exports = router;
