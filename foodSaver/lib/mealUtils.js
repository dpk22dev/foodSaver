var FsConfig = require('./config.js');
var constants = FsConfig.constants;

exports.getMealEsId = function ( id ) {
    var res = ( id !== undefined && id.length > 0 ) ? id : undefined;
    return res;
}

exports.validateMealObjForSrch = function ( meal ) {
    var ret = {};
    ret.error = true;
    ret.msg = [];

    if( meal.coordArr.lon === constants.LON || meal.coordArr.lat === constants.LAT ){
        ret.msg.push( "coord arr not provided correctly" );
    }

/*    if( meal.orgType === undefined ){
        ret.msg.push( "org type not provided correctly" );
    }*/

    if( meal.radius === -1 ){
        ret.msg.push( "radius not provided correctly" );
    }

    if( meal.foodType === undefined ) {
        meal.foodType = constants.NONVEG_FOODTYPE;
    }

    if( meal.forStr === undefined ){
        ret.msg.push( "for str not provided correctly" );
    }

    if( meal.refrig === undefined ){
        meal.refrig = false;
    }else if( meal.refrig == "false" ){
        meal.refrig = false;
    }else{
        meal.refrig = true;
    }

    if( ret.msg.length > 0 ){
        return ret;
    }

    ret.error = false;
    return ret;

}

exports.validateAddMealData = function ( meal ) {
    var ret = {};
    ret.error = true;
    ret.msg = [];

    if( meal.contMode === undefined ){
        ret.msg.push( "contact mode not provided" );
    }

    if( meal.foodType === undefined ){
        ret.msg.push( "food type not provided" );
    }

    if( meal.quantity === -1 ){
        ret.msg.push( "food quantitiy not provided" );
    }

    if( meal.mealFor === undefined ){
        ret.msg.push( "food for not provided" );
    }
    if( meal.forName === undefined ){
        ret.msg.push( "food for name not provided" );
    }

    if( meal.pickUpAddr.street === undefined || meal.pickUpAddr.city === undefined || meal.pickUpAddr.state === undefined ){
        ret.msg.push( "pick up address not provided" );
    }

    /*if( meal.refrig === undefined ){
        ret.msg.push( "refrigeration required not provided" );
    }*/

    if( meal.estExpTime === undefined ){
        ret.msg.push( "pick up address not provided" );
    }

    if( meal.refrig === undefined ){
        meal.refrig = false;
    }else if( meal.refrig == "false" ){
        meal.refrig = false;
    }else{
        meal.refrig = true;
    }


    if( ret.msg.length > 0 ){
        return ret;
    }

    ret.error = false;
    return ret;

}