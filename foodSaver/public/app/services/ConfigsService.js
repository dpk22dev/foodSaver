angular.module('app').factory('FsConfigService', function(){
		return {
		  domain : "http://fs.com",
		  port : 3000,
		  serverLogUrl : "http://fs.com:3000/logging/log",
		  cacheTimeout: 30,
          orgGetApiUriPath: "/org",
          orgAddApiUriPath: "/org/add-org",
          orgSearchApiUriPath: "/org/search",

          mealAddApiUriPath: '/meal/add-meal',
          contactModesArr: [
              {"value":"all","text":"all modes"},
              {"value":"phone","text":"call and sms"},
              {"value":"whatsapp","text":"whatsapp only"},
              {"value":"person","text":"person to person"},
              {"value":"none","text":"do not contact"}
          ],
          defaultContactMode: {"value":"all","text":"all modes"},
          orgTypeArr: [
              {"value":"needy","text":"Needy"},
              {"value":"donor","text":"Donor"}
          ],
          orgForArr: [
              {"value":"human","text":"Humans"},
              {"value":"animals","text":"Animals"}
          ],
          defaultOrgFor: {"value":"human","text":"Humans"},
          defaultForName: "",
          foodTypeArr: [
              {"value":"veg","text":"Veg only"},
              {"value":"non-veg","text":"veg/Non veg"}
          ],
          defaultFoodType : {"value":"veg","text":"Veg only"},
          defaultDonationQuantity: {"value":"0.5","text":"Half kg"},
          refrigArr: [
                {"value":"yes","text":"Yes sure"},
                {"value":"no","text":"Not necessary"}
          ],
          defaultRefrig : {"value":"yes","text":"Yes sure"}
            
        }
} );