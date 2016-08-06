var config = require('./config.js');
var fs = require('fs');

exports.getLog = function ( condition, cb ) {

}

exports.putLog = function ( logData, cb ) {
    var fileName = config.log.file;
    fs.writeFile(fileName, logData, function(err) {
        if(err) {
            return console.log(err);
        }
        cb();
    });
}