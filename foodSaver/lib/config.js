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
        HUMAN: "human",
        MEAL: {
            CONT_MODE: {
                ALL: "all",
                PHONE: "phone",
                WHATSAPP: "whatsapp"
            },
            FOOD_TYPE: {
                VEG: "veg",
                NON_VEG: "non-veg"
            },
            MEAL_FOR:{
                HUMAN: {
                   NAME: 'human',
                   CHILD: 'children',
                   OLDAGE: 'oldage',
                   WOMEN: 'women'
                },
                ANIMAL: {
                   NAME: 'animal',
                   DOG: 'dog',
                   CAT: 'cat'
                }
            },
            STATUS : {
                UNASSIGNED : "unassigned",
                ASSIGNED: "assigned",
                PICKED: "picked",
                RETREAT: "retreat"
            }
        },
        ORG : {
            ORG_TYPE: {
                DONOR: "donor",
                NEEDY: "needy"
            }
        }
    },

    log:{
        file : "/tmp/logs"
    }

}

