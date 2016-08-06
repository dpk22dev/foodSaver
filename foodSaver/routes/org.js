var express = require('express');
var router = express.Router();

var config = require('../lib/config.js');
var esQueryProvider = require('../lib/esOrgQueries.js');

var esClient = require('../lib/esClient.js');
var orgUtils = require('../lib/orgUtils.js');

var orgIndex = config.es.orgIndex;
var orgType = config.es.orgIndexType;

/* post params for org
every request should follow it
 orgName
 street
 city
 state
 zip
 lon
 lat
 persons
 phones
 emailIds
 faxes
 whatsappIds
 contMode
 orgType
 orgFor
 orgForName
 estBreakfastAmnt
 estLunchAmnt
 estDinnerAmnt
 comment

 radius
 bmin
 bmax
 lmin
 lmax
 dmin
 dmax
 rating
 */

var getOrgObj = function ( obj ) {
    var res = {};
    res.name = orgUtils.getOrgName( obj.orgName );
    res.address = {};
    res.address.street = orgUtils.getStreet( obj.street );
    res.address.city = orgUtils.getCity( obj.city );
    res.address.state = orgUtils.getState( obj.state );
    res.address.zip = orgUtils.getZip( obj.zip );
    var lon = orgUtils.getLon( obj.lon );
    var lat = orgUtils.getLat( obj.lat );
    res.locCoord = [lon, lat];
    res.contact = {};
    var persons = orgUtils.getPersons( obj.persons );
    res.contact.contactPersons = [];
    res.contact.contactPersons = persons.split(",");

    var phones = orgUtils.getPhones(obj.phones);
    res.contact.phones = [];
    res.contact.phones = phones.split(",");

    var emailIds = orgUtils.getEmailIds( obj.emailIds );
    res.contact.emailIds = [];
    res.contact.emailIds = emailIds.split(",");

    var faxes = orgUtils.getFaxes(obj.faxes);
    res.contact.fax = [];
    res.contact.fax = faxes.split(",");

    var whatsappIds = orgUtils.getWhatsAppIds( obj.whatsappIds );
    res.contact.whatsappIds = [];
    res.contact.whatsappIds = whatsappIds.split(",");

    res.contactMode = orgUtils.getContactMode( obj.contMode );

    var typeInfo = {};
    typeInfo.orgType = orgUtils.getOrgType( obj.orgType );
    typeInfo.orgFor = orgUtils.getOrgFor( obj.orgFor );
    typeInfo.orgForName = orgUtils.getOrgForName( obj.orgForName );
    res.typeInfo = typeInfo;

    var estMealAmnt = {};
    estMealAmnt.breakfastAmnt = orgUtils.getBreakFastAmnt( obj.estBreakfastAmnt );
    estMealAmnt.lunchAmnt = orgUtils.getLunchAmnt( obj.estLunchAmnt );
    estMealAmnt.dinnerAmnt = orgUtils.getDinnerAmnt( obj.estDinnerAmnt );
    res.estMealAmnt = estMealAmnt;

    var comment = orgUtils.getComment( obj.comment );
    res.comment = comment;

    return res;
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

    res.contactMode = orgUtils.getContactMode( obj.contMode );
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
    obj.id = orgUtils.getOrgEsId( req.query.id );
    if( obj.id === undefined ){
        res.send( "empty id provided" );
    }

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
    var isValid = orgUtils.validateAddOrgData( orgObj );
    if( isValid.error === true ){
        res.send( isValid.msg );
    }
    
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
