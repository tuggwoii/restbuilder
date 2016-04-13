'use strict';
var Sequelize = require('sequelize');
var sequelize = new Sequelize('restbuilder', 'axkme@axkme', 'Axkdb2016', {
    host: 'axkme.database.windows.net',
    dialect: 'mssql',
    pool: {
        maxConnections: 100,
        minConnections: 0,
        maxIdleTime: 10000
    },
    dialectOptions: {
      encrypt: true
    },
    omitNull: true
});
module.exports = sequelize;