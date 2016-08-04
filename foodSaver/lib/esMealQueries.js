var FsConfig = require('./config.js');
var constants = FsConfig.constants;

exports.getMealSearchQuery = function ( idx, itype, foodType, forStr, refrig, radius, coordArr ) {

    if( foodType == constants.VEG_FOODTYPE ){
        foodQuery = {"term": {"food-type": constants.VEG_FOODTYPE}};
    }else{
        foodQuery = {"term": {"food-type": constants.VEG_FOODTYPE}}, {"term": {"food-type": constants.NONVEG_FOODTYPE}};
    }
    
    var searchParams = {
        index: idx,
        type: itype,

        body: {
            "query": {
                "bool": {
                    "must": [
                        foodQuery,
                        {"term": {"for": forStr}},
                        {"term": {"refrigeration": refrig}}
                    ],
                    "filter": {
                        "geo_distance": {
                            "distance": radius,
                            "pick-up-coord": coordArr
                        }
                    }
                }
            }
        }
    };
    
    return searchParams;
}

exports.getActiveMealsQuery = function ( idx, itype, obj ) {
    //for donor where recipeint is null and exp date < current date
    // for needy where recipeitn is id and status is not picked
    if( obj.orgType == FsConfig.constants.ORG.ORG_TYPE.DONOR ){
        qry = {"term": {"donor": obj.id }}, {"term": {"status": FsConfig.constants.MEAL.STATUS.UNASSIGNED }}
    }else{
        qry = {"term": {"recipient": obj.id }}, {"term": {"status": FsConfig.constants.MEAL.STATUS.ASSIGNED }}
    }

    var searchParams = {
        index: idx,
        type: itype,

        body: {
            "query": {
                "bool": {
                    "must": [
                        qry
                    ]
                }
            }
        }
    };
    return searchParams;
}

exports.getMealHistoryQuery = function ( idx, itype, obj ) {
    // needy might have donated too
    // meals where id in donor or reciepient
    if( obj.orgType == FsConfig.constants.ORG.ORG_TYPE.DONOR ){
        qry = {"term": {"donor": obj.id }}
    }else{
        qry = {"term": {"recipient": obj.id }}
    }



    var searchParams = {
        index: idx,
        type: itype,

        body: {
            "query": {
                "bool": {
                    "must": [
                        qry
                    ]
                }
            }
        }
    };
    return searchParams;
}

exports.addMealQuery = function ( idx, itype, meal ) {

    var searchParams = {
        index: idx,
        type: itype,
        body: {
            "donor" : meal.orgType,
            "contact-mode" : meal.contMode,
            "food-type" : meal.foodType,
            "quantity" : meal.quantity,
            "for": meal.mealFor,
            "for-name" : meal.forName,
            "food-info" : meal.foodInfo,
            "pick-up-addr" : {
                "street" : meal.pickUpAddr.street,
                "city" : meal.pickUpAddr.city,
                "state": meal.pickUpAddr.state,
                "zip": meal.pickUpAddr.zip
            },
            "pick-up-coord" : meal.pickUpCoord,
            "pick-up-timings": {
                "start": meal.pickUpTimings.start,
                "end": meal.pickUpTimings.end
            },
            "comment": meal.comment,
            "refrigeration": meal.refrig,
            "est-expire-time": meal.estExpTime,
            "status": meal.status,
            "recipient": meal.recipient
        }
    };
    return searchParams;

}

exports.deleteMealQuery = function ( idx, itype, mealId ) {
    // delete meal with id
    var searchParams = {
        index: idx,
        type: itype,
        id: mealId
    };
    return searchParams;
}
