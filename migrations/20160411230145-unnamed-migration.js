'use strict';
module.exports = {
    up: function (queryInterface, Sequelize, done) {
        queryInterface.createTable(
            'roles', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE
                }
            }).then(function () {
                console.log('success');
            }).catch(function (err) {
                console.log(err);
            });
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.dropTable('roles');
    }
};