module.exports = {
    hostDomain: "http://fs.com/",
    hostPort: "3000",
    
    es: {
        connection : {
            host: 'localhost:9200'
        },
        mealIndex : "meal",
        mealIndexType : "unit",

        orgIndex : "organization",
        orgIndexType: "unit"
    },

    constants: {
        VEG_FOODTYPE: "veg",
        NONVEG_FOODTYPE: "non-veg",
        HUMAN: "human"
    }

}

