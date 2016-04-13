'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.createTable(
           'users',
           {
               id: {
                   type: Sequelize.INTEGER,
                   primaryKey: true,
                   autoIncrement: true
               },
               createdAt: {
                   type: Sequelize.DATE,
                   allowNull: false
               },
               updatedAt: {
                   type: Sequelize.DATE
               },
               first_name: {
                   type: Sequelize.STRING,
                   allowNull: false
               },
               last_name: {
                   type: Sequelize.STRING,
                   allowNull: false
               },
               email: {
                   type: Sequelize.STRING,
                   unique: true,
                   allowNull: false
               },
               password: {
                   type: Sequelize.STRING,
                   allowNull: false
               },
               roleId: {
                   type: Sequelize.INTEGER,
                   allowNull: false,
                   references: { model: "roles", key: "id" }
               }
           }).then(function () {
               console.log('success');
           }).catch(function (err) {
               console.log(err);
           });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
