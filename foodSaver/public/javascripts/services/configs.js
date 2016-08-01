angular.module('foodsaver').factory('FsConfigService', function(){
		return {
		  domain : "http://fs.com",
		  port : 3000,
		  serverLogUrl : "http://fs.com:3000/logging/log",
		  cacheTimeout: 30
		}
} );