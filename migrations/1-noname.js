'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "brokers", deps: []
 * createTable "lands", deps: []
 * createTable "homes", deps: []
 * createTable "locations", deps: []
 * createTable "requiredlocations", deps: []
 * createTable "clients", deps: [brokers, requiredlocations]
 * createTable "properties", deps: [lands, homes, brokers, locations]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2021-12-05T09:58:44.112Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "brokers",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "username": {
                        "type": Sequelize.STRING,
                        "field": "username"
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email"
                    },
                    "password": {
                        "type": Sequelize.STRING,
                        "field": "password"
                    },
                    "imageUrl": {
                        "type": Sequelize.STRING,
                        "field": "imageUrl"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "lands",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "price": {
                        "type": Sequelize.DOUBLE,
                        "field": "price"
                    },
                    "landArea": {
                        "type": Sequelize.FLOAT,
                        "field": "landArea"
                    },
                    "roadAccess": {
                        "type": Sequelize.STRING,
                        "field": "roadAccess"
                    },
                    "waterSupply": {
                        "type": Sequelize.STRING,
                        "field": "waterSupply"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "homes",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "price": {
                        "type": Sequelize.DOUBLE,
                        "field": "price"
                    },
                    "landArea": {
                        "type": Sequelize.FLOAT,
                        "field": "landArea"
                    },
                    "roadAccess": {
                        "type": Sequelize.STRING,
                        "field": "roadAccess"
                    },
                    "waterSupply": {
                        "type": Sequelize.STRING,
                        "field": "waterSupply"
                    },
                    "kitchens": {
                        "type": Sequelize.INTEGER,
                        "field": "kitchens"
                    },
                    "bathrooms": {
                        "type": Sequelize.INTEGER,
                        "field": "bathrooms"
                    },
                    "floors": {
                        "type": Sequelize.FLOAT,
                        "field": "floors"
                    },
                    "bedrooms": {
                        "type": Sequelize.INTEGER,
                        "field": "bedrooms"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "locations",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "province": {
                        "type": Sequelize.INTEGER,
                        "field": "province"
                    },
                    "district": {
                        "type": Sequelize.STRING,
                        "field": "district"
                    },
                    "municipality": {
                        "type": Sequelize.STRING,
                        "field": "municipality"
                    },
                    "ward": {
                        "type": Sequelize.INTEGER,
                        "field": "ward"
                    },
                    "street": {
                        "type": Sequelize.STRING,
                        "field": "street"
                    },
                    "latitude": {
                        "type": Sequelize.DOUBLE,
                        "field": "latitude"
                    },
                    "longitude": {
                        "type": Sequelize.DOUBLE,
                        "field": "longitude"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "requiredlocations",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "province": {
                        "type": Sequelize.INTEGER,
                        "field": "province"
                    },
                    "district": {
                        "type": Sequelize.STRING,
                        "field": "district"
                    },
                    "municipality": {
                        "type": Sequelize.STRING,
                        "field": "municipality"
                    },
                    "ward": {
                        "type": Sequelize.INTEGER,
                        "field": "ward"
                    },
                    "street": {
                        "type": Sequelize.STRING,
                        "field": "street"
                    },
                    "latitude": {
                        "type": Sequelize.DOUBLE ,
                        "field": "latitude"
                    },
                    "longitude": {
                        "type": Sequelize.DOUBLE ,
                        "field": "longitude"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "clients",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name"
                    },
                    "phone": {
                        "type": Sequelize.BIGINT,
                        "field": "phone"
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email"
                    },
                    "propertyType": {
                        "type": Sequelize.INTEGER,
                        "field": "propertyType",
                        "defaultValue": 0
                    },
                    "price": {
                        "type": Sequelize.DOUBLE ,
                        "field": "price"
                    },
                    "landArea": {
                        "type": Sequelize.FLOAT,
                        "field": "landArea"
                    },
                    "roadAccess": {
                        "type": Sequelize.STRING,
                        "field": "roadAccess"
                    },
                    "waterSupply": {
                        "type": Sequelize.STRING,
                        "field": "waterSupply"
                    },
                    "kitchens": {
                        "type": Sequelize.INTEGER,
                        "field": "kitchens"
                    },
                    "bathrooms": {
                        "type": Sequelize.INTEGER,
                        "field": "bathrooms"
                    },
                    "floors": {
                        "type": Sequelize.FLOAT,
                        "field": "floors"
                    },
                    "bedrooms": {
                        "type": Sequelize.INTEGER,
                        "field": "bedrooms"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "brokerId": {
                        "type": Sequelize.INTEGER,
                        "field": "brokerId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "brokers",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "requiredlocationId": {
                        "type": Sequelize.INTEGER,
                        "field": "requiredlocationId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "requiredlocations",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "properties",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "sellStatus": {
                        "type": Sequelize.BOOLEAN,
                        "field": "sellStatus",
                        "defaultValue": false
                    },
                    "images": {
                        "type": Sequelize.TEXT,
                        "field": "images"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "landId": {
                        "type": Sequelize.INTEGER,
                        "field": "landId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "lands",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "homeId": {
                        "type": Sequelize.INTEGER,
                        "field": "homeId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "homes",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "brokerId": {
                        "type": Sequelize.INTEGER,
                        "field": "brokerId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "brokers",
                            "key": "id"
                        },
                        "allowNull": true
                    },
                    "locationId": {
                        "type": Sequelize.INTEGER,
                        "field": "locationId",
                        "onUpdate": "CASCADE",
                        "onDelete": "SET NULL",
                        "references": {
                            "model": "locations",
                            "key": "id"
                        },
                        "allowNull": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["brokers", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["clients", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["lands", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["homes", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["locations", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["properties", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["requiredlocations", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};
