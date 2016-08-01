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

exports.getActiveMealsQuery = function ( id, orgType ) {
    //for donor where recipeint is null and exp date < current date
    // for needy where recipeitn is id and status is not picked
}

exports.getMealHistoryQuery = function ( id ) {
    // needy might have donated too
    // meals where id in donor or reciepient
}

exports.addMealQuery = function ( mealData ) {

}

exports.deleteMealQuery = function ( id ) {
    // delete meal with id
}
