var config = require('../lib/config.js');
var elasticSearch = require('elasticsearch');

var extend = require('util')._extend;
var esConn = extend({}, config.es.connection);

var esClient = new elasticSearch.Client( esConn );

module.exports = esClient;