var express = require('express');
var router = express.Router();

var config = require('../lib/config.js');
var esQueryProvider = require('../lib/esOrgQueries.js');

var esClient = require('../lib/esClient.js');
var orgUtils = require('../lib/orgUtils.js');

var orgIndex = config.es.orgIndex;
var orgType = config.es.orgIndexType;

var getOrgObj = function ( obj ) {
    var res = {};
    res.name = orgUtils.getOrgName( obj.orgName );
    res.address = {};
    res.address.street = orgUtils.getStreet( obj.street );
    res.address.city = orgUtils.getCity( obj.city );
    res.address.state = obj.state ? obj.state : "uttar pradesh";
    res.address.zip = obj.zip ? obj.zip : '124001';
    var lon = orgUtils.getLon( obj.lon );
    var lat = orgUtils.getLat( obj.lat );
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

    res.contactMode = orgUtils.getContactMode( obj.contactMode );

    var typeInfo = {};
    typeInfo.orgType = orgUtils.getOrgType( obj.orgType );
    typeInfo.orgFor = orgUtils.getOrgFor( obj.orgFor );
    typeInfo.orgForName = orgUtils.getOrgForName( obj.orgForName );
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
    res.orgName = orgUtils.getOrgName( obj.orgName );
        //( obj.orgName !== undefined && obj.orgName.length > 0 ) ? obj.orgName : undefined;

    var lon = orgUtils.getLon( obj.lon ); 
        //( obj.lon !== undefined ) ? parseFloat( obj.lon ) : 77;
    var lat = orgUtils.getLat( obj.lat ); 
        //( obj.lat !== undefined ) ? parseFloat( obj.lat ) : 29;
    
    res.locCoord = [lon, lat];

    res.radius = orgUtils.getRadius( obj.radius ); 
        //( obj.radius !== undefined && obj.radius.length > 0 ) ? obj.radius+'km' : undefined;

    res.orgType = orgUtils.getOrgType( obj.orgType ); 
        //( obj.orgType !== undefined && obj.orgType.length > 0 ) ? obj.orgType : undefined;
    
    res.orgFor = orgUtils.getOrgFor( obj.orgFor ); 
        //( obj.orgFor !== undefined && obj.orgFor.length > 0 ) ? obj.orgFor : undefined;
    res.orgForName = orgUtils.getOrgForName( obj.orgForName );
        //( obj.orgForName !== undefined && obj.orgForName.length > 0 ) ? obj.orgForName : undefined;

    res.contactMode = orgUtils.getContactMode( obj.contactMode ); 
        //( obj.contactMode !== undefined && obj.contactMode.length > 0 ) ? obj.contactMode : undefined;

    res.breakfast = {};
    res.breakfast.min = orgUtils.getBreakFastMin( obj.bmin ); 
        //obj.bmin ? obj.bmin : -1;
    res.breakfast.max = orgUtils.getBreakFastMax( obj.bmax); 
        //obj.bmax ? obj.bmax : -1;

    res.lunch = {};
    res.lunch.min = orgUtils.getLunchMin( obj.lmin ); 
        //obj.lmin ? obj.lmin : -1;
    res.lunch.max = orgUtils.getLunchMax( obj.lmax ); 
        //obj.lmax ? obj.lmax : -1;

    res.dinner = {};
    res.dinner.min = orgUtils.getDinnerMin( obj.dmin );
        //obj.dmin ? obj.dmin : -1;
    res.dinner.max = orgUtils.getDinnerMax( obj.dmax ); 
        //obj.dmax ? obj.dmax : -1;

    res.rating = orgUtils.getRating( obj.rating ); 
        //( obj.rating !== undefined && obj.rating.length > 0 ) ? parseFloat( obj.rating ) : -1;

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
