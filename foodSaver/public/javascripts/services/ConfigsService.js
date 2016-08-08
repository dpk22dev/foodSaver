angular.module('foodsaver').factory('FsConfigService', function(){
		return {
		  domain : "http://fs.com",
		  port : 3000,
		  serverLogUrl : "http://fs.com:3000/logging/log",
		  cacheTimeout: 30,
          orgGetApiUriPath: "/org",
          orgAddApiUriPath: "/org/add-org",

          contactModesArr: [
              {"value":"all","text":"all modes"},
              {"value":"phone","text":"call and sms"},
              {"value":"whatsapp","text":"whatsapp only"},
              {"value":"person","text":"person to person"},
              {"value":"none","text":"do not contact"}
          ],
          orgTypeArr: [
              {"value":"needy","text":"Needy"},
              {"value":"donor","text":"Donor"}
          ],
          orgForArr: [
              {"value":"human","text":"Humans"},
              {"value":"animals","text":"Animals"}
          ]
        }
} );